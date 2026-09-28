export const PAYMENT_METHODS = [
  "cash",
  "upi",
  "card",
  "other",
] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export function isPaymentMethod(
  value: string,
): value is PaymentMethod {
  return PAYMENT_METHODS.includes(
    value.trim().toLowerCase() as PaymentMethod,
  );
}