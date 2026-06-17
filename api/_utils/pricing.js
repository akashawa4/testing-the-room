// api/_utils/pricing.js
// Single source of truth for subscription pricing.
// Used by create-order.js (and future renewal endpoints).

/**
 * Subscription amount (INR) keyed by roomType.
 * Any roomType not listed here is considered invalid.
 */
export const ROOM_TYPE_PRICING = {
  'Single Room': 100,
  'Cot Basis':   100,
  '1 RK':        150,
  '1 BHK':       200,
  '2 BHK':       300,
};

/** Subscription validity period in days. */
export const SUBSCRIPTION_DURATION_DAYS = 90;

/**
 * Returns the subscription amount for a given roomType.
 * Throws a descriptive Error if the roomType is not recognised.
 *
 * @param {string} roomType - e.g. "1 RK", "2 BHK"
 * @returns {number} amount in INR
 */
export function getAmountForRoomType(roomType) {
  const amount = ROOM_TYPE_PRICING[roomType];
  if (amount === undefined) {
    throw new Error(
      `Unknown roomType: "${roomType}". Valid values: ${Object.keys(ROOM_TYPE_PRICING).join(', ')}`
    );
  }
  return amount;
}
