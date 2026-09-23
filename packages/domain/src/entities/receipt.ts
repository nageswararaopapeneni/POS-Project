export type ReceiptStatus = "GENERATED" | "PRINTED" | "PRINT_FAILED";

export interface Receipt {
  id: string;
  saleId: string;
  receiptNumber: string;
  status: ReceiptStatus;
  generatedAt: Date;
  printedAt?: Date;
}