# Firestore Payment Security Recommendations

To ensure the integrity of the subscription flow, Firestore Security Rules MUST prevent clients from directly modifying payment or subscription metadata.

## Risk
If a malicious user can write to the `rooms` collection, they could set `subscriptionStatus = "active"`, `paymentStatus = "paid"`, and `subscriptionEnd` to a date far into the future without ever completing a Cashfree payment.

## Required Security Rule Additions

In your `firestore.rules`, enforce that the following fields CANNOT be modified by client requests:

- `paymentStatus`
- `subscriptionStatus`
- `subscriptionStart`
- `subscriptionEnd`
- `subscriptionAmount`

### Example Implementation Strategy

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId} {
      
      // Function to check if sensitive payment fields are being modified
      function modifyingPaymentFields() {
        return request.resource.data.diff(resource.data).affectedKeys()
          .hasAny(['paymentStatus', 'subscriptionStatus', 'subscriptionStart', 'subscriptionEnd', 'subscriptionAmount']);
      }
      
      // Allow create only if they set the initial payment state to pending
      allow create: if request.auth != null && 
                       request.resource.data.paymentStatus == 'pending' &&
                       request.resource.data.subscriptionStatus == 'pending';
      
      // Allow update only if they ARE NOT modifying payment fields
      allow update: if request.auth != null && 
                       !modifyingPaymentFields();
      
      // Allow read for everyone
      allow read: if true;
    }
  }
}
```

## How do these fields get updated then?
Only the secure Vercel Serverless Function (`api/cashfree-webhook.js` or `api/verify-payment.js`), running with the `firebase-admin` SDK, should update these fields. The Admin SDK bypasses Security Rules, meaning your backend can still securely toggle a room to active after a verified Cashfree transaction.
