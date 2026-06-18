// src/services/paymentService.js
// Frontend service for handling Cashfree payments

let cashfreePromise = null;

/**
 * Dynamically load the Cashfree JS SDK script.
 * Caches the promise so the script is only injected once.
 * @returns {Promise<function>} - The Cashfree constructor
 */
export function loadCashfreeSDK() {
  if (cashfreePromise) return cashfreePromise;

  cashfreePromise = new Promise((resolve, reject) => {
    if (window.Cashfree) {
      resolve(window.Cashfree);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      if (window.Cashfree) {
        resolve(window.Cashfree);
      } else {
        reject(new Error('Cashfree object not found on window after script load'));
      }
    };
    script.onerror = () => {
      cashfreePromise = null; // allow retry
      reject(new Error('Failed to load Cashfree SDK script'));
    };
    document.body.appendChild(script);
  });

  return cashfreePromise;
}

/**
 * Initiate Cashfree payment checkout flow.
 * 1. Loads the Cashfree JS SDK.
 * 2. Calls /api/create-order to get a paymentSessionId.
 * 3. Opens the Cashfree hosted checkout page.
 *
 * @param {object} orderData - { roomId, roomType, customerName, customerEmail, customerPhone }
 * @returns {Promise<{ orderId: string }>}
 */
export async function initiatePayment(orderData) {
  // 1. Ensure Cashfree JS SDK is loaded
  const CashfreeConstructor = await loadCashfreeSDK();

  // 2. Call Vercel Serverless Function to create the payment order
  // Strip trailing slash from env var to avoid double-slash URLs
  // Falls back to window.location.origin so mobile/preview builds always hit the right host
  const API_BASE =
    import.meta.env.VITE_API_URL?.replace(/\/$/, '') ||
    window.location.origin;

  // Verbose debug block — visible in DevTools on any device
  console.log('[API DEBUG]');
  console.log('ENV URL:', import.meta.env.VITE_API_URL);
  console.log('Origin:', window.location.origin);
  console.log('Final URL:', `${API_BASE}/api/create-order`);

  const response = await fetch(`${API_BASE}/api/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',   // prevent stale mobile cache returning wrong response
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    console.error('[paymentService] create-order failed:', response.status, errBody);
    throw new Error(errBody.error || `Failed to create payment order (${response.status})`);
  }

  // API returns snake_case keys: payment_session_id, order_id
  const data = await response.json();

  // Debug log — helps diagnose payment_session_id issues in production
  console.log('[paymentService] create-order response:', JSON.stringify(data));

  // Validate payment_session_id before opening checkout
  if (!data.payment_session_id) {
    console.error('[paymentService] Missing payment_session_id in response:', data);
    throw new Error('Missing payment_session_id — cannot open checkout. Check Cashfree credentials and order configuration.');
  }

  const { payment_session_id, order_id } = data;

  // 3. Determine environment (sandbox vs production)
  // Hardcoded to sandbox for current testing setup
  const cashfreeMode = 'sandbox';

  console.log('[Cashfree Debug] Mode:', cashfreeMode);
  console.log('[Cashfree Debug] Session:', payment_session_id);
  console.log(`[paymentService] Opening Cashfree checkout in ${cashfreeMode} mode | order: ${order_id} | session: ${payment_session_id.substring(0, 20)}...`);

  // 4. Initialize Cashfree instance
  const cashfree = CashfreeConstructor({ mode: cashfreeMode });

  // 5. Open checkout (redirects the current tab — compatible with PWAs and iOS WebViews)
  await cashfree.checkout({
    paymentSessionId: payment_session_id,
    redirectTarget: '_self',
  });

  return { orderId: order_id };
}

/**
 * Verify payment status with the Vercel backend (fallback after redirect).
 * Called by App.jsx when the page reloads with ?payment_status=check&order_id=xxx
 *
 * @param {string} orderId
 * @returns {Promise<object>} - { status, roomId, ... }
 */
export async function verifyPayment(orderId) {
  // Strip trailing slash from env var; fall back to current origin
  const API_BASE =
    import.meta.env.VITE_API_URL?.replace(/\/$/, '') ||
    window.location.origin;

  // Verbose debug block
  console.log('[API DEBUG]');
  console.log('ENV URL:', import.meta.env.VITE_API_URL);
  console.log('Origin:', window.location.origin);
  console.log('Final URL:', `${API_BASE}/api/verify-payment?orderId=${encodeURIComponent(orderId)}`);

  const response = await fetch(
    `${API_BASE}/api/verify-payment?orderId=${encodeURIComponent(orderId)}`,
    { headers: { 'Cache-Control': 'no-cache' } }  // defeat mobile HTTP cache
  );
  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody.error || `Payment verification failed (${response.status})`);
  }
  return response.json();
}
