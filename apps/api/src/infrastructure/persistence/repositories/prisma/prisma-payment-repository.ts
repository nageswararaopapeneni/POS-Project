import { Injectable } from "@nestjs/common";
import type {
  PaymentRecord,
  PaymentRepository,
  PaymentStatus,
} from "../../../../application";
import { PrismaClientService } from "../../prisma";
import { decimalToNumber } from "../../prisma";

function toPaymentStatus(status: string): PaymentStatus {
  switch (status) {
    case "pending":
    case "successful":
    case "failed":
    case "reversed":
      return status;

    default:
      throw new Error(`Unsupported payment status: ${status}`);
  }
}

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async create(payment: PaymentRecord): Promise<PaymentRecord> {
    const created = await this.prisma.payment.create({
      data: {
        id: payment.id,
        businessId: payment.businessId,
        saleId: payment.saleId,
        amount: payment.amount,
        method: payment.method,
        status: payment.status,
        reference: payment.reference,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      },
    });

    return {
      id: created.id,
      businessId: created.businessId,
      saleId: created.saleId,
      amount: decimalToNumber(created.amount),
      method: created.method,
      status: toPaymentStatus(created.status),
      reference: created.reference,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }

  async findById(id: string): Promise<PaymentRecord | null> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return null;
    }

    return {
      id: payment.id,
      businessId: payment.businessId,
      saleId: payment.saleId,
      amount: decimalToNumber(payment.amount),
      method: payment.method,
      status: toPaymentStatus(payment.status),
      reference: payment.reference,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }

  async findBySaleId(saleId: string): Promise<PaymentRecord[]> {
    const payments = await this.prisma.payment.findMany({
      where: { saleId },
      orderBy: { createdAt: "asc" },
    });

    return payments.map((payment) => ({
      id: payment.id,
      businessId: payment.businessId,
      saleId: payment.saleId,
      amount: decimalToNumber(payment.amount),
      method: payment.method,
      status: toPaymentStatus(payment.status),
      reference: payment.reference,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    }));
  }
}