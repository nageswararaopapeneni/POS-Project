export const SaleStatus = {
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
  PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED",
} as const;

export type SaleStatus =
  (typeof SaleStatus)[keyof typeof SaleStatus];