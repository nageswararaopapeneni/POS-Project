import type {
  ReceiptRecord,
  ReceiptRepository,
} from "../../../../application";

export class InMemoryReceiptRepository implements ReceiptRepository {
  private readonly receipts = new Map<string, ReceiptRecord>();

  async create(receipt: ReceiptRecord): Promise<ReceiptRecord> {
    this.receipts.set(receipt.id, receipt);
    return receipt;
  }

  async findById(id: string): Promise<ReceiptRecord | null> {
    return this.receipts.get(id) ?? null;
  }

  async findBySaleId(saleId: string): Promise<ReceiptRecord | null> {
    for (const receipt of this.receipts.values()) {
      if (receipt.saleId === saleId) {
        return receipt;
      }
    }

    return null;
  }
}