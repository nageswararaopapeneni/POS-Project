import type { PaymentStatus } from "../value-objects/payment-status";

export type PaymentMethod =
  | "CASH"
  | "CARD"
  | "UPI"
  | "OTHER";

export interface Payment {
  id: string;
  saleId: string;
  method: PaymentMethod;
  provider?: string;
  amount: number;
  status: PaymentStatus;
  externalReference?: string;
  createdAt: Date;
}