# Cashfree Production Launch Checklist

Before launching the Nivasi Room Rental App to real users and accepting actual payments, ensure all items on this checklist are completed.

## 1. Environment Variables & Keys
- [ ] Create a Production App in the Cashfree Merchant Dashboard.
- [ ] Obtain Production `CASHFREE_CLIENT_ID` and `CASHFREE_CLIENT_SECRET`.
- [ ] Update Vercel Environment Variables:
  - `CASHFREE_CLIENT_ID` = (Production Key)
  - `CASHFREE_CLIENT_SECRET` = (Production Secret)
  - `CASHFREE_ENV` = `production`
- [ ] Ensure `FIREBASE_SERVICE_ACCOUNT` is properly set in Vercel with no line-break issues.

## 2. Frontend Configuration
- [ ] In `src/services/paymentService.js`, update the hardcoded mode from `'sandbox'` to `'production'` (or ideally, make it driven by a `VITE_CASHFREE_ENV` variable).
  ```javascript
  const cashfreeMode = 'production'; // Set this to production!
  ```

## 3. Webhook Configuration
- [ ] In the Cashfree Merchant Dashboard, register your production Webhook URL.
  - URL should be: `https://your-vercel-domain.vercel.app/api/cashfree-webhook`
- [ ] Select the events to listen to: `PAYMENT_SUCCESS`, `PAYMENT_FAILED`.
- [ ] Verify that the webhook is successfully reaching Vercel (check Vercel Serverless Logs).

## 4. Firestore Security
- [ ] Implement the Security Rules outlined in `docs/firestore-payment-security.md` to prevent users from bypassing payment.

## 5. End-to-End Verification
- [ ] Run a test transaction using a real payment method (e.g., ₹1 UPI).
- [ ] Verify the money reaches your Cashfree merchant account.
- [ ] Verify that the Vercel Webhook (`/api/cashfree-webhook`) successfully updates the `rooms` collection in Firestore to `paymentStatus: "paid"` and `subscriptionStatus: "active"`.
- [ ] Verify that the frontend UI reflects the active subscription and marks it "Active until <date>".
