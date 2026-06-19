# Cashfree Production Checklist

## Webhook Endpoint
- **Production URL**: `https://www.nivasispace.com/api/cashfree-webhook`
- **Testing URL (Vercel preview)**: `https://testing-the-room.vercel.app/api/cashfree-webhook`

## Required Vercel Environment Variables
| Variable | Value (example) | Description |
|----------|----------------|-------------|
| `CASHFREE_ENV` | `production` | Set to `production` for live payments. |
| `CASHFREE_CLIENT_ID` | `your_production_client_id` | Cashfree client ID for production. |
| `CASHFREE_CLIENT_SECRET` | `your_production_client_secret` | Secret used for API calls and optional webhook signature verification. |
| `CASHFREE_WEBHOOK_SECRET` | `your_webhook_secret` | **Optional** – if set, the webhook handler verifies the HMAC signature. |
| `VITE_CASHFREE_ENV` | `production` | Front‑end flag to use production Cashfree SDK. |
| `VITE_API_URL` | `https://www.nivasispace.com` | Base URL for client API calls. |
| `FIREBASE_SERVICE_ACCOUNT` | (JSON string) | Service account credentials for Firebase Admin SDK. |

## Firestore Structure (relevant collections)
- `payments/{orderId}` – stores the payment record and must contain a `roomId` field linking to the room.
- `rooms/{roomId}` – stores room metadata, subscription status and publishing flag.

## Manual Test Steps
1. **Create a test order** using the front‑end (points to the testing URL). The order will be created in Cashfree sandbox.
2. Simulate a successful payment in the Cashfree dashboard or via their testing tools.
3. Verify that:
   - `payments/{orderId}` now has `status: "paid"`, `cashfreeStatus: "PAID"` and `webhookReceivedAt` timestamp.
   - `rooms/{roomId}` has `paymentStatus: "paid"`, `subscriptionStatus: "active"`, `isPublished: true`, and `subscriptionEnd` set ~90 days ahead.
4. Repeat the webhook call (e.g., resend from Cashfree) and ensure the handler returns a 200 with `idempotent: true` and does **not** duplicate the subscription.
5. Test a failed payment scenario (e.g., cancel the order). Verify that the payment document is marked `failed`/`cancelled` and the room stays unpublished.
6. If `CASHFREE_WEBHOOK_SECRET` is set, tamper with the `x-webhook-signature` header and confirm the endpoint returns a 401.

## Deployment Checklist
- [ ] Environment variables are set in Vercel (Production scope).
- [ ] `CASHFREE_WEBHOOK_SECRET` is stored securely (optional but recommended).
- [ ] Firestore security rules allow the serverless function to read/write the `payments` and `rooms` collections.
- [ ] The webhook URL is registered in the Cashfree dashboard under **Settings → Webhooks**.
- [ ] Verify logs in Vercel do not contain full payloads – only the safe log entries defined in the handler.

---
*This checklist should be reviewed whenever the Cashfree integration or Firestore schema changes.*
