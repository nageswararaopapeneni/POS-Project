export type PaymentStatus =
  | "pending"
  | "successful"
  | "failed"
  | "reversed";

export interface PaymentRecord {
  readonly id: string;
  readonly businessId: string;
  readonly saleId: string;
  readonly amount: number;
  readonly method: string;
  readonly status: PaymentStatus;
  readonly provider?: string | null;
  readonly externalReference?: string | null;
  readonly reference?: string | null;
  readonly idempotencyKey?: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CreatePaymentRecord {
  readonly businessId: string;
  readonly saleId: string;
  readonly amount: number;
  readonly method: string;
  readonly status: PaymentStatus;
  readonly provider?: string | null;
  readonly externalReference?: string | null;
  readonly reference?: string | null;
  readonly idempotencyKey?: string | null;
}

export interface UpdatePaymentStatusRecord {
  readonly paymentId: string;
  readonly businessId: string;
  readonly status: PaymentStatus;
}

export interface PaymentRepository {
  findById(
    businessId: string,
    paymentId: string,
  ): Promise<PaymentRecord | null>;

  findBySaleId(
    businessId: string,
    saleId: string,
  ): Promise<readonly PaymentRecord[]>;

  findByIdempotencyKey(
    businessId: string,
    idempotencyKey: string,
  ): Promise<PaymentRecord | null>;

  create(input: CreatePaymentRecord): Promise<PaymentRecord>;

  updateStatus(
    input: UpdatePaymentStatusRecord,
  ): Promise<PaymentRecord>;
}