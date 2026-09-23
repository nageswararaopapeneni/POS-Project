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
  readonly reference?: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CreatePaymentRecord {
  readonly businessId: string;
  readonly saleId: string;
  readonly amount: number;
  readonly method: string;
  readonly status: PaymentStatus;
  readonly reference?: string | null;
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

  create(input: CreatePaymentRecord): Promise<PaymentRecord>;
}