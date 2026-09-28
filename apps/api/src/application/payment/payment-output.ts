import type { PaymentStatus } from "../ports/payment-repository";

export interface PaymentOutput {
  readonly id: string;
  readonly businessId: string;
  readonly saleId: string;
  readonly amount: number;
  readonly method: string;
  readonly status: PaymentStatus;
  readonly provider: string | null | undefined;
  readonly externalReference: string | null | undefined;
  readonly reference: string | null | undefined;
  readonly idempotencyKey: string | null | undefined;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}