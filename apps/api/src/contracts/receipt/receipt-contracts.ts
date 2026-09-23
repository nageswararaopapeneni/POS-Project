export interface GenerateReceiptRequest {
  readonly businessId: string;
  readonly saleId: string;
}

export interface ReceiptResponse {
  readonly id: string;
  readonly businessId: string;
  readonly saleId: string;
  readonly receiptNumber: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}