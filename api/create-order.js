// api/create-order.js
// Vercel Serverless Function — creates a Cashfree payment order.
// POST /api/create-order
// Body: { roomId, roomType, customerName, customerEmail, customerPhone }
// Returns: { payment_session_id, order_id, order_amount, order_status }

import { Cashfree } from 'cashfree-pg';
import { getAmountForRoomType } from './_utils/pricing.js';

// ─── SDK initialisation (module-level, runs once per cold start) ──────────────
Cashfree.XClientId     = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
Cashfree.XEnvironment  =
  process.env.CASHFREE_ENV === 'production'
    ? Cashfree.Environment.PRODUCTION
    : Cashfree.Environment.SANDBOX;
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Strips a raw phone string down to exactly 10 digits.
 * Handles +91 / 91 prefixes and non-digit characters.
 */
function normalisePhone(phone) {
  let digits = String(phone).replace(/\D/g, '');
  if (digits.length > 10 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }
  if (digits.length !== 10) {
    // Fallback: take the last 10 digits and zero-pad from the left
    digits = digits.slice(-10).padStart(10, '0');
  }
  return digits;
}

/**
 * Best-effort extraction of the request origin for building the return URL.
 */
function resolveOrigin(req) {
  if (req.headers.origin) return req.headers.origin;
  if (req.headers.referer) {
    try { return new URL(req.headers.referer).origin; } catch { /* ignore */ }
  }
  if (req.headers.host) {
    const isLocal =
      req.headers.host.startsWith('localhost') ||
      req.headers.host.startsWith('127.0.0.1');
    return `${isLocal ? 'http' : 'https'}://${req.headers.host}`;
  }
  return 'https://nivasi.space';
}

export default async function handler(req, res) {
  // ── CORS ───────────────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  // ──────────────────────────────────────────────────────────────────────────

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Validate environment ───────────────────────────────────────────────────
  if (!process.env.CASHFREE_CLIENT_ID || !process.env.CASHFREE_CLIENT_SECRET) {
    console.error('[create-order] Missing CASHFREE_CLIENT_ID or CASHFREE_CLIENT_SECRET');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // ── Parse & validate body ──────────────────────────────────────────────────
  const { roomId, roomType, customerName, customerEmail, customerPhone } = req.body ?? {};

  // Log roomId and its type for debugging
  console.log('roomId:', roomId);
  console.log('roomId type:', typeof roomId);

  if (!roomId) {
    return res.status(400).json({
      error: 'Missing roomId',
    });
  }

  if (!roomType || !customerName || !customerPhone) {
    return res.status(400).json({
      error: 'Missing required fields: roomType, customerName, customerPhone',
    });
  }

  // Safely normalize roomId
  let normalizedRoomId = '';
  if (typeof roomId === 'string') {
    normalizedRoomId = roomId;
  } else if (typeof roomId === 'number') {
    normalizedRoomId = String(roomId);
  } else if (roomId && typeof roomId === 'object') {
    normalizedRoomId = typeof roomId.id === 'string' ? roomId.id : (roomId.id ? String(roomId.id) : String(roomId));
  } else {
    normalizedRoomId = String(roomId);
  }

  // ── Resolve amount from roomType (server-side — never trust client) ────────
  let amount;
  try {
    amount = getAmountForRoomType(roomType);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  // ── Build order ────────────────────────────────────────────────────────────
  // Order ID embeds roomId so the webhook can extract it without a DB lookup.
  // Format: order_<roomId>_<unixMs>
  const orderId = `order_${normalizedRoomId}_${Date.now()}`;
  const origin  = resolveOrigin(req);

  const orderRequest = {
    order_id:       orderId,
    order_amount:   amount,
    order_currency: 'INR',
    customer_details: {
      customer_id:    `cust_${normalizedRoomId.slice(0, 12)}`,
      customer_name:  customerName,
      customer_email: customerEmail || 'no-reply@nivasi.space',
      customer_phone: normalisePhone(customerPhone),
    },
    order_meta: {
      // Cashfree replaces {order_id} in the URL with the actual order ID
      return_url: `${origin}/?payment_status=check&order_id={order_id}`,
    },
  };

  // ── Call Cashfree SDK ──────────────────────────────────────────────────────
  try {
    const response = await Cashfree.PGCreateOrder('2023-08-01', orderRequest);
    const order    = response.data;

    console.log(`[create-order] Order created: ${order.order_id} | ₹${order.order_amount}`);

    return res.status(200).json({
      payment_session_id: order.payment_session_id,
      order_id:           order.order_id,
      order_amount:       order.order_amount,
      order_status:       order.order_status,
    });
  } catch (err) {
    const detail = err?.response?.data ?? err.message;
    console.error('[create-order] Cashfree API error:', detail);
    return res.status(502).json({ error: 'Failed to create payment order', detail });
  }
}
