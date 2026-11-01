/**
 * Shared pricing calculation functions for Sanchari service reservations.
 * Ensures consistent calculation logic across homestays, tour guides, and cultural experiences.
 * All outputs clearly represent demonstration / sample pricing.
 */

export interface StayPricingBreakdown {
  nightlyRate: number;
  nightsCount: number;
  roomSubtotal: number;
  cleaningFee: number;
  serviceFee: number;
  taxAmount: number; // 12% GST on accommodations
  totalEstimated: number;
}

export interface GuidePricingBreakdown {
  dayRate: number;
  durationDays: number;
  slotRate?: number;
  subtotal: number;
  taxAmount: number; // 5% GST
  totalEstimated: number;
}

export interface ExperiencePricingBreakdown {
  personRate: number;
  participantsCount: number;
  subtotal: number;
  serviceFee: number;
  taxAmount: number; // 5% GST
  totalEstimated: number;
}

/**
 * Calculates price estimate for homestay accommodation.
 */
export function calculateStayPricing(
  nightlyRate: number,
  checkInDate?: string,
  checkOutDate?: string,
  cleaningFee: number = 350
): StayPricingBreakdown {
  let nightsCount = 1;

  if (checkInDate && checkOutDate) {
    const start = new Date(checkInDate).getTime();
    const end = new Date(checkOutDate).getTime();
    if (!isNaN(start) && !isNaN(end) && end > start) {
      const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      nightsCount = Math.max(1, diffDays);
    }
  }

  const roomSubtotal = nightlyRate * nightsCount;
  const serviceFee = Math.round(roomSubtotal * 0.03); // 3% platform facilitation preview
  const taxableAmount = roomSubtotal + cleaningFee + serviceFee;
  const taxAmount = Math.round(taxableAmount * 0.12); // 12% GST
  const totalEstimated = taxableAmount + taxAmount;

  return {
    nightlyRate,
    nightsCount,
    roomSubtotal,
    cleaningFee,
    serviceFee,
    taxAmount,
    totalEstimated,
  };
}

/**
 * Calculates price estimate for licensed local guide.
 */
export function calculateGuidePricing(
  dayRate: number,
  slotRate?: number,
  daysCount: number = 1
): GuidePricingBreakdown {
  const effectiveBase = slotRate ?? dayRate;
  const subtotal = effectiveBase * Math.max(1, daysCount);
  const taxAmount = Math.round(subtotal * 0.05); // 5% GST
  const totalEstimated = subtotal + taxAmount;

  return {
    dayRate,
    durationDays: daysCount,
    slotRate,
    subtotal,
    taxAmount,
    totalEstimated,
  };
}

/**
 * Calculates price estimate for cultural activity or workshop.
 */
export function calculateExperiencePricing(
  personRate: number,
  participantsCount: number = 1
): ExperiencePricingBreakdown {
  const validParticipants = Math.max(1, participantsCount);
  const subtotal = personRate * validParticipants;
  const serviceFee = Math.round(subtotal * 0.04); // 4% activity coordination preview
  const taxAmount = Math.round((subtotal + serviceFee) * 0.05); // 5% GST
  const totalEstimated = subtotal + serviceFee + taxAmount;

  return {
    personRate,
    participantsCount: validParticipants,
    subtotal,
    serviceFee,
    taxAmount,
    totalEstimated,
  };
}
