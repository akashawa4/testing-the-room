// api/cashfree-webhook.js
// Vercel Serverless Function — receives and verifies Cashfree webhook events.
// POST /api/cashfree-webhook

import crypto from 'crypto';
import admin from 'firebase-admin';

// ─── Firebase Admin (once per cold start) ─────────────────────────────────────
if (!admin.apps.length) {
  try {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) {
      console.error('[cashfree-webhook] FIREBASE_SERVICE_ACCOUNT env var is missing');
    } else {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(raw))
      });
    }
  } catch (err) {
    console.error('[cashfree-webhook] Firebase Admin init error:', err.message);
  }
}
// ─────────────────────────────────────────────────────────────────────────────

const SUBSCRIPTION_DURATION_DAYS = 90;

// Vercel must NOT parse the body — we need the raw bytes for HMAC verification.
export const config = {
  api: { bodyParser: false },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Reads all chunks from a Node.js Readable stream and returns them
 * concatenated as a UTF-8 string.
 */
async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

/**
 * Verifies the Cashfree webhook HMAC-SHA256 signature.
 * Cashfree signs `timestamp + rawBody` with CASHFREE_CLIENT_SECRET.
 */
function isSignatureValid(rawBody, signature, timestamp, secret) {
  const payload  = timestamp + rawBody;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('base64');
  return expected === signature;
}



// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Read raw body (must happen before anything else)
  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch (err) {
    console.error('[cashfree-webhook] Failed to read body:', err.message);
    return res.status(400).json({ error: 'Cannot read request body' });
  }

  // 2. Extract signature headers
  const signature = req.headers['x-webhook-signature'];
  const timestamp = req.headers['x-webhook-timestamp'];

  if (!signature || !timestamp) {
    console.error('[cashfree-webhook] Missing x-webhook-signature or x-webhook-timestamp');
    return res.status(400).json({ error: 'Missing webhook signature headers' });
  }

  // 3. Verify secret is configured
  const secret = process.env.CASHFREE_CLIENT_SECRET;
  if (!secret) {
    console.error('[cashfree-webhook] CASHFREE_CLIENT_SECRET is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // 4. Verify HMAC — reject immediately if invalid
  if (!isSignatureValid(rawBody, signature, timestamp, secret)) {
    console.error('[cashfree-webhook] Signature mismatch — possible spoofed request');
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  // 5. Parse event payload
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (err) {
    console.error('[cashfree-webhook] Invalid JSON:', err.message);
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  const eventType = event?.type;
  const orderId   = event?.data?.order?.order_id;
  
  let roomId = null;
  if (orderId) {
    try {
      const db = admin.firestore();
      const paymentSnap = await db.collection('payments').doc(orderId).get();
      if (paymentSnap.exists) {
        roomId = paymentSnap.data().roomId;
      } else {
        console.warn(`[cashfree-webhook] Payment mapping not found for order: ${orderId}`);
      }
    } catch (err) {
      console.error('[cashfree-webhook] Failed to get payment mapping:', err.message);
    }
  }

  console.log(`[cashfree-webhook] Event: ${eventType} | order: ${orderId} | room: ${roomId}`);

  // 6. Route by event type
  if (eventType === 'PAYMENT_SUCCESS_WEBHOOK') {
    await handlePaymentSuccess(event, roomId, orderId);
  } else if (eventType === 'PAYMENT_FAILED_WEBHOOK') {
    await handlePaymentFailed(roomId);
  } else {
    console.log(`[cashfree-webhook] Unhandled event type: ${eventType}`);
  }

  // Always return 200 to prevent Cashfree from retrying
  return res.status(200).json({ received: true });
}

// ─── Event handlers ───────────────────────────────────────────────────────────

/**
 * PAYMENT_SUCCESS_WEBHOOK
 * Activates the 90-day subscription and publishes the room.
 */
async function handlePaymentSuccess(event, roomId, orderId) {
  if (!roomId) {
    console.warn('[cashfree-webhook] handlePaymentSuccess: roomId could not be extracted — skipping');
    return;
  }

  const cfPaymentId = event?.data?.payment?.cf_payment_id;
  console.log(`[cashfree-webhook] Payment SUCCESS | roomId: ${roomId} | cfPaymentId: ${cfPaymentId}`);

  try {
    const db   = admin.firestore();
    const now  = new Date();
    const subscriptionEnd = new Date(now.getTime() + SUBSCRIPTION_DURATION_DAYS * 86_400_000);

    await db.collection('rooms').doc(roomId).update({
      paymentStatus:      'paid',
      subscriptionStatus: 'active',
      subscriptionStart:  admin.firestore.Timestamp.fromDate(now),
      subscriptionEnd:    admin.firestore.Timestamp.fromDate(subscriptionEnd),
      paymentOrderId:     String(cfPaymentId ?? orderId ?? ''),
      isPublished:        true,
      updatedAt:          admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`[cashfree-webhook] Firestore updated — room ${roomId} is now active until ${subscriptionEnd.toISOString()}`);
  } catch (err) {
    console.error(`[cashfree-webhook] Firestore update failed for room ${roomId}:`, err.message);
    // Do NOT return an error status — Cashfree would retry and the next call may succeed
  }
}

/**
 * PAYMENT_FAILED_WEBHOOK
 * Marks the room payment as failed so admin can retry.
 */
async function handlePaymentFailed(roomId) {
  if (!roomId) {
    console.warn('[cashfree-webhook] handlePaymentFailed: roomId could not be extracted — skipping');
    return;
  }

  console.log(`[cashfree-webhook] Payment FAILED | roomId: ${roomId}`);

  try {
    const db = admin.firestore();
    await db.collection('rooms').doc(roomId).update({
      paymentStatus: 'failed',
      updatedAt:     admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`[cashfree-webhook] Firestore updated — room ${roomId} marked as payment failed`);
  } catch (err) {
    console.error(`[cashfree-webhook] Firestore update failed for room ${roomId}:`, err.message);
  }
}
