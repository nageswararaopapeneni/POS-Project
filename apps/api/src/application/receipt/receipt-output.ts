export interface ReceiptRecord {
  readonly id: string;
  readonly businessId: string;
  readonly saleId: string;
  readonly receiptNumber: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CreateReceiptRecord {
  readonly businessId: string;
  readonly saleId: string;
  readonly receiptNumber: string;
}

export interface ReceiptRepository {
  findById(
    businessId: string,
    receiptId: string,
  ): Promise<ReceiptRecord | null>;

  findBySaleId(
    businessId: string,
    saleId: string,
  ): Promise<ReceiptRecord | null>;

  create(input: CreateReceiptRecord): Promise<ReceiptRecord>;
}

export interface ReceiptNumberGenerator {
  generate(): string;
}

export interface ReceiptOutput {
  readonly id: string;
  readonly businessId: string;
  readonly saleId: string;
  readonly receiptNumber: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}