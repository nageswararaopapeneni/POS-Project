export interface GenerateReceiptInput {
  readonly businessId: string;
  readonly saleId: string;
}

export interface GetReceiptInput {
  readonly businessId: string;
  readonly receiptId: string;
}