import { Injectable } from "@nestjs/common";
import type {
  CreateReceiptRecord,
  ReceiptRecord,
  ReceiptRepository,
} from "../../../../application";
import { PrismaClientService } from "../../prisma";

@Injectable()
export class PrismaReceiptRepository implements ReceiptRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async create(input: CreateReceiptRecord): Promise<ReceiptRecord> {
    const created = await this.prisma.receipt.create({
      data: {
        businessId: input.businessId,
        saleId: input.saleId,
        receiptNumber: input.receiptNumber,
      },
    });

    return {
      id: created.id,
      businessId: created.businessId,
      saleId: created.saleId,
      receiptNumber: created.receiptNumber,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }

  async findById(
    businessId: string,
    receiptId: string,
  ): Promise<ReceiptRecord | null> {
    const receipt = await this.prisma.receipt.findFirst({
      where: {
        id: receiptId,
        businessId,
      },
    });

    if (!receipt) {
      return null;
    }

    return {
      id: receipt.id,
      businessId: receipt.businessId,
      saleId: receipt.saleId,
      receiptNumber: receipt.receiptNumber,
      createdAt: receipt.createdAt,
      updatedAt: receipt.updatedAt,
    };
  }

  async findBySaleId(
    businessId: string,
    saleId: string,
  ): Promise<ReceiptRecord | null> {
    const receipt = await this.prisma.receipt.findFirst({
      where: {
        businessId,
        saleId,
      },
    });

    if (!receipt) {
      return null;
    }

    return {
      id: receipt.id,
      businessId: receipt.businessId,
      saleId: receipt.saleId,
      receiptNumber: receipt.receiptNumber,
      createdAt: receipt.createdAt,
      updatedAt: receipt.updatedAt,
    };
  }
}