import type {
  CreateReceiptRecord,
  ReceiptRecord,
  ReceiptRepository,
} from "../../../../application";

export class InMemoryReceiptRepository implements ReceiptRepository {
  private readonly receipts = new Map<string, ReceiptRecord>();

  async create(input: CreateReceiptRecord): Promise<ReceiptRecord> {
    const now = new Date();

    const receipt: ReceiptRecord = {
      id: crypto.randomUUID(),
      businessId: input.businessId,
      saleId: input.saleId,
      receiptNumber: input.receiptNumber,
      createdAt: now,
      updatedAt: now,
    };

    this.receipts.set(receipt.id, receipt);

    return receipt;
  }

  async findById(
    businessId: string,
    receiptId: string,
  ): Promise<ReceiptRecord | null> {
    const receipt = this.receipts.get(receiptId);

    if (!receipt || receipt.businessId !== businessId) {
      return null;
    }

    return receipt;
  }

  async findBySaleId(
    businessId: string,
    saleId: string,
  ): Promise<ReceiptRecord | null> {
    for (const receipt of this.receipts.values()) {
      if (
        receipt.businessId === businessId &&
        receipt.saleId === saleId
      ) {
        return receipt;
      }
    }

    return null;
  }
}