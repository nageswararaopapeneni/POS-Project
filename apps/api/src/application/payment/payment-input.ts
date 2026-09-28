export interface CreatePaymentInput {
  readonly businessId: string;
  readonly saleId: string;
  readonly amount: number;
  readonly method: string;
  readonly provider?: string | null;
  readonly externalReference?: string | null;
  readonly reference?: string | null;
  readonly idempotencyKey?: string | null;
}

export interface GetPaymentInput {
  readonly businessId: string;
  readonly paymentId: string;
}

export interface GetSalePaymentsInput {
  readonly businessId: string;
  readonly saleId: string;
}

export interface GetPaymentsBySaleInput {
  readonly businessId: string;
  readonly saleId: string;
}

export interface UpdatePaymentStatusInput {
  readonly businessId: string;
  readonly paymentId: string;
  readonly status: string;
}