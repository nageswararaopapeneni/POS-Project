export type PaymentStatus =
  | "pending"
  | "successful"
  | "failed"
  | "reversed";

export interface CreatePaymentRequest {
  readonly businessId: string;
  readonly saleId: string;
  readonly amount: number;
  readonly method: string;
  readonly status?: PaymentStatus;
  readonly reference?: string | null;
}

export interface PaymentResponse {
  readonly id: string;
  readonly businessId: string;
  readonly saleId: string;
  readonly amount: number;
  readonly method: string;
  readonly status: PaymentStatus;
  readonly reference: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}