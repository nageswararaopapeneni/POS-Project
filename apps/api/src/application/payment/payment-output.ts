import type { PaymentStatus } from "../ports/payment-repository";

export interface PaymentOutput {
  readonly id: string;
  readonly businessId: string;
  readonly saleId: string;
  readonly amount: number;
  readonly method: string;
  readonly status: PaymentStatus;
  readonly reference: string | null | undefined;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}