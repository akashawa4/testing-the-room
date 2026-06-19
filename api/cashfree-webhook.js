// api/cashfree-webhook.js
// Vercel Serverless Function — receives Cashfree webhook events.
// POST /api/cashfree-webhook

import crypto from 'crypto';
import admin from 'firebase-admin';

// ─── Firebase Admin (initialize once per cold start) ──────────────────────────────
if (!admin.apps.length) {
  try {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (raw) {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(raw))
      });
    } else {
      console.error('[cashfree-webhook] FIREBASE_SERVICE_ACCOUNT is missing');
    }
  } catch (e) {
    console.error('[cashfree-webhook] Firebase init error:', e.message);
  }
}
// ────────────────────────────────────────────────────────────────────────────────

const SUBSCRIPTION_DURATION_DAYS = 90;

// Vercel must receive the raw request body for HMAC verification.
export const config = {
  api: { bodyParser: false }
};

// ─── Utilities ────────────────────────────────────────────────────────────────
/** Reads the raw request body as a UTF‑8 string */
async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

/** Verifies Cashfree HMAC‑SHA256 signature
 *  Cashfree signs `${timestamp}${rawBody}` with the webhook secret.
 */
function verifySignature(rawBody, signature, timestamp, secret) {
  const payload = `${timestamp}${rawBody}`;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64');
  return expected === signature;
}

/** Consistent, safe logging – never prints the full payload */
function safeLog({ event, orderId, roomId, status, firestore }) {
  const parts = [];
  if (event) parts.push(`[cashfree-webhook] event: ${event}`);
  if (orderId) parts.push(`[cashfree-webhook] orderId: ${orderId}`);
  if (roomId) parts.push(`[cashfree-webhook] mapped roomId: ${roomId}`);
  if (status) parts.push(`[cashfree-webhook] payment status: ${status}`);
  if (firestore) parts.push(`[cashfree-webhook] Firestore updated: ${firestore}`);
  console.log(parts.join(' | '));
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // 1️⃣ Accept only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2️⃣ Read raw body (must be before any parsing)
  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch (e) {
    console.error('[cashfree-webhook] Body read error:', e.message);
    return res.status(400).json({ error: 'Cannot read request body' });
  }

  // 3️⃣ Extract required webhook headers
  const signature = req.headers['x-webhook-signature'];
  const timestamp = req.headers['x-webhook-timestamp'];
  if (!signature || !timestamp) {
    console.error('[cashfree-webhook] Missing signature headers');
    return res.status(400).json({ error: 'Missing webhook signature headers' });
  }

  // 4️⃣ Optional signature verification – only if secret is configured
  const webhookSecret = process.env.CASHFREE_WEBHOOK_SECRET;
  if (webhookSecret) {
    if (!verifySignature(rawBody, signature, timestamp, webhookSecret)) {
      console.error('[cashfree-webhook] Invalid signature');
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }
  } else {
    // TODO: Add support for secret rotation via Vercel secrets if needed.
    console.warn('[cashfree-webhook] CASHFREE_WEBHOOK_SECRET not set – skipping signature verification');
  }

  // 5️⃣ Parse JSON payload
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (e) {
    console.error('[cashfree-webhook] Invalid JSON:', e.message);
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  const eventType = event?.type;
  const orderId = event?.data?.order?.order_id || event?.data?.order?.cf_order_id;
  if (!orderId) {
    console.error('[cashfree-webhook] order_id missing');
    return res.status(400).json({ error: 'Missing orderId' });
  }

  const db = admin.firestore();
  const paymentRef = db.collection('payments').doc(orderId);
  const paymentSnap = await paymentRef.get();
  if (!paymentSnap.exists) {
    console.error(`[cashfree-webhook] No payment document for orderId ${orderId}`);
    return res.status(400).json({ error: 'Payment mapping not found' });
  }
  const paymentData = paymentSnap.data();
  const roomId = paymentData.roomId;
  if (!roomId) {
    console.error(`[cashfree-webhook] roomId missing in payment doc ${orderId}`);
    return res.status(400).json({ error: 'roomId missing in payment document' });
  }

  // 6️⃣ Idempotency – if this webhook status was already recorded, skip updates
  const incomingStatus = event?.data?.payment?.payment_status || eventType;
  if (paymentData.cashfreeStatus && paymentData.cashfreeStatus === incomingStatus) {
    safeLog({ event: eventType, orderId, roomId, status: incomingStatus, firestore: 'skipped (idempotent)' });
    return res.status(200).json({ received: true, idempotent: true });
  }

  // 7️⃣ Route based on known statuses
  if (eventType === 'PAYMENT_SUCCESS_WEBHOOK' || incomingStatus === 'PAID') {
    await handleSuccess({ event, roomId, orderId, paymentRef });
  } else if (
    eventType === 'PAYMENT_FAILED_WEBHOOK' ||
    incomingStatus === 'FAILURE' ||
    incomingStatus === 'CANCELLED' ||
    incomingStatus === 'USER_DROPPED'
  ) {
    await handleFailure({ event, roomId, orderId, paymentRef, incomingStatus });
  } else {
    console.log(`[cashfree-webhook] Unhandled event type: ${eventType}`);
  }

  // 8️⃣ Always reply 200 for known events – Cashfree will stop retrying.
  return res.status(200).json({ received: true });
}

// ─── Event handlers ───────────────────────────────────────────────────────────
async function handleSuccess({ event, roomId, orderId, paymentRef }) {
  const cfPaymentId = event?.data?.payment?.cf_payment_id || orderId;
  const now = admin.firestore.Timestamp.now();
  const subscriptionEnd = admin.firestore.Timestamp.fromDate(
    new Date(Date.now() + SUBSCRIPTION_DURATION_DAYS * 86_400_000)
  );

  // Update room document – publish and activate subscription
  try {
    await admin.firestore().collection('rooms').doc(roomId).update({
      paymentStatus: 'paid',
      subscriptionStatus: 'active',
      subscriptionStart: now,
      subscriptionEnd,
      paymentOrderId: String(cfPaymentId),
      isPublished: true,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    safeLog({ event: event.type, orderId, roomId, status: 'PAID', firestore: 'room updated' });
  } catch (e) {
    console.error(`[cashfree-webhook] Room update failed for ${roomId}:`, e.message);
  }

  // Update payment document – idempotency guard already applied above
  try {
    await paymentRef.update({
      status: 'paid',
      cashfreeStatus: 'PAID',
      webhookReceivedAt: admin.firestore.Timestamp.now()
    });
    safeLog({ event: event.type, orderId, roomId, status: 'PAID', firestore: 'payment updated' });
  } catch (e) {
    console.error(`[cashfree-webhook] Payment update failed for ${orderId}:`, e.message);
  }
}

async function handleFailure({ event, roomId, orderId, paymentRef, incomingStatus }) {
  const statusMap = {
    FAILURE: 'failed',
    CANCELLED: 'cancelled',
    USER_DROPPED: 'cancelled'
  };
  const paymentStatus = statusMap[incomingStatus] || 'failed';

  // Update payment document
  try {
    await paymentRef.update({
      status: paymentStatus,
      cashfreeStatus: incomingStatus,
      webhookReceivedAt: admin.firestore.Timestamp.now()
    });
    safeLog({ event: event?.type, orderId, roomId, status: incomingStatus, firestore: 'payment updated' });
  } catch (e) {
    console.error(`[cashfree-webhook] Payment update failed for ${orderId}:`, e.message);
  }

  // Update room paymentStatus only – do NOT publish on failure
  try {
    await admin.firestore().collection('rooms').doc(roomId).update({
      paymentStatus: paymentStatus,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    safeLog({ event: event?.type, orderId, roomId, status: incomingStatus, firestore: 'room payment flag updated' });
  } catch (e) {
    console.error(`[cashfree-webhook] Room update failed for ${roomId}:`, e.message);
  }
}
