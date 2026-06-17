// Subscription Configuration
export const SUBSCRIPTION_DURATION_DAYS = 90;
export const EXPIRY_WARNING_DAYS = 7;

export const ROOM_TYPE_PRICING = {
  'Cot Basis': 100,
  'Single Room': 100,
  '1 RK': 150,
  '1 BHK': 200,
  '2 BHK': 300
};

/**
 * Get subscription amount based on room type
 * @param {string} roomType 
 * @returns {number}
 */
export function getSubscriptionAmount(roomType) {
  const price = ROOM_TYPE_PRICING[roomType];
  if (price === undefined) {
    // Default fallback or throw error
    throw new Error(`Invalid room type: ${roomType}`);
  }
  return price;
}

/**
 * Check if subscription is active
 * @param {object|string|number} subscriptionEnd - Firebase Timestamp, Date, or milliseconds
 * @returns {boolean}
 */
export function isSubscriptionActive(subscriptionEnd) {
  if (!subscriptionEnd) return false;
  
  // Handle Firebase Timestamp or normal Date / timestamp ms
  let endTimeMs;
  if (subscriptionEnd.seconds) {
    endTimeMs = subscriptionEnd.seconds * 1000;
  } else if (subscriptionEnd.toDate && typeof subscriptionEnd.toDate === 'function') {
    endTimeMs = subscriptionEnd.toDate().getTime();
  } else {
    endTimeMs = new Date(subscriptionEnd).getTime();
  }
  
  return endTimeMs > Date.now();
}

/**
 * Check if subscription is expiring soon (within warning days)
 * @param {object|string|number} subscriptionEnd 
 * @returns {boolean}
 */
export function isExpiringSoon(subscriptionEnd) {
  if (!subscriptionEnd) return false;
  
  let endTimeMs;
  if (subscriptionEnd.seconds) {
    endTimeMs = subscriptionEnd.seconds * 1000;
  } else if (subscriptionEnd.toDate && typeof subscriptionEnd.toDate === 'function') {
    endTimeMs = subscriptionEnd.toDate().getTime();
  } else {
    endTimeMs = new Date(subscriptionEnd).getTime();
  }
  
  const nowMs = Date.now();
  const diffMs = endTimeMs - nowMs;
  const warningMs = EXPIRY_WARNING_DAYS * 24 * 60 * 60 * 1000;
  
  return diffMs > 0 && diffMs <= warningMs;
}

/**
 * Get remaining days until subscription expiry
 * @param {object|string|number} subscriptionEnd 
 * @returns {number}
 */
export function getDaysUntilExpiry(subscriptionEnd) {
  if (!subscriptionEnd) return 0;
  
  let endTimeMs;
  if (subscriptionEnd.seconds) {
    endTimeMs = subscriptionEnd.seconds * 1000;
  } else if (subscriptionEnd.toDate && typeof subscriptionEnd.toDate === 'function') {
    endTimeMs = subscriptionEnd.toDate().getTime();
  } else {
    endTimeMs = new Date(subscriptionEnd).getTime();
  }
  
  const diffMs = endTimeMs - Date.now();
  if (diffMs <= 0) return 0;
  
  return Math.ceil(diffMs / (24 * 60 * 60 * 1000));
}
