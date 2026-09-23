import { Injectable } from "@nestjs/common";
import type {
  ReceiptRecord,
  ReceiptRepository,
} from "../../../../application";

@Injectable()
export class PrismaReceiptRepository implements ReceiptRepository {
  async create(receipt: ReceiptRecord): Promise<ReceiptRecord> {
    return receipt;
  }

  async findById(id: string): Promise<ReceiptRecord | null> {
    void id;
    return null;
  }

  async findBySaleId(saleId: string): Promise<ReceiptRecord | null> {
    void saleId;
    return null;
  }
}