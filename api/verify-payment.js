// api/verify-payment.js
// Vercel Serverless Function to verify Cashfree payment and update Firestore
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountJson) {
      throw new Error('Missing FIREBASE_SERVICE_ACCOUNT environment variable');
    }
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error('Firebase Admin init error:', error);
  }
}

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { orderId } = req.query;

  if (!orderId) {
    return res.status(400).json({ error: 'Missing orderId parameter' });
  }

  try {
    // Cashfree credentials
    const appId = process.env.CASHFREE_CLIENT_ID;
    const secretKey = process.env.CASHFREE_CLIENT_SECRET;
    const cashfreeEnv = process.env.CASHFREE_ENV || 'sandbox';

    if (!appId || !secretKey) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const cashfreeUrl = cashfreeEnv === 'production'
      ? `https://api.cashfree.com/pg/orders/${orderId}`
      : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

    const response = await fetch(cashfreeUrl, {
      method: 'GET',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree verification call failed:', data);
      return res.status(response.status).json({ error: data.message || 'Failed to verify payment with Cashfree' });
    }

    // Extract roomId from orderId (format: order_roomId_timestamp)
    // E.g., order_123456_17181920
    const prefix = 'order_';
    if (!orderId.startsWith(prefix)) {
      return res.status(400).json({ error: 'Invalid order ID format' });
    }
    const lastUnderscore = orderId.lastIndexOf('_');
    if (lastUnderscore <= prefix.length) {
      return res.status(400).json({ error: 'Invalid order ID format' });
    }
    const roomId = orderId.substring(prefix.length, lastUnderscore);

    const isPaid = data.order_status === 'PAID';
    
    // Connect to Firestore and update the room
    const db = admin.firestore();
    const roomRef = db.collection('rooms').doc(roomId);
    const roomSnap = await roomRef.get();

    if (!roomSnap.exists) {
      return res.status(404).json({ error: `Room not found with ID ${roomId}` });
    }

    const currentData = roomSnap.data();

    if (isPaid) {
      const now = new Date();
      // 90 days subscription
      const subscriptionEnd = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

      const updatePayload = {
        paymentStatus: 'paid',
        subscriptionStatus: 'active',
        subscriptionStart: admin.firestore.Timestamp.fromDate(now),
        subscriptionEnd: admin.firestore.Timestamp.fromDate(subscriptionEnd),
        paymentOrderId: String(data.cf_order_id || data.order_id || ''),
        isPublished: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      await roomRef.update(updatePayload);
      
      return res.status(200).json({
        status: 'success',
        message: 'Payment verified and subscription activated',
        roomId,
        room: { ...currentData, ...updatePayload }
      });
    } else {
      // Payment not successful (could be ACTIVE, FAILED, etc.)
      const updatePayload = {
        paymentStatus: data.order_status === 'FAILED' ? 'failed' : 'pending',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      await roomRef.update(updatePayload);

      return res.status(200).json({
        status: 'pending',
        message: `Payment status is ${data.order_status}`,
        orderStatus: data.order_status,
        roomId
      });
    }
  } catch (error) {
    console.error('Error in verify-payment API:', error);
    return res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
}
