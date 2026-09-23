import type { PaymentStatus } from "../ports/payment-repository";

export interface CreatePaymentInput {
  readonly businessId: string;
  readonly saleId: string;
  readonly amount: number;
  readonly method: string;
  readonly status?: PaymentStatus;
  readonly reference?: string | null;
}

export interface GetPaymentInput {
  readonly businessId: string;
  readonly paymentId: string;
}

export interface GetSalePaymentsInput {
  readonly businessId: string;
  readonly saleId: string;
}