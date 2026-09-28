import { Injectable } from "@nestjs/common";
import type {
  CreatePaymentRecord,
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
      throw new Error(
        `Unsupported payment status: ${status}`,
      );
  }
}

@Injectable()
export class PrismaPaymentRepository
  implements PaymentRepository
{
  constructor(
    private readonly prisma: PrismaClientService,
  ) {}

  async create(
    payment: CreatePaymentRecord,
  ): Promise<PaymentRecord> {
    const created = await this.prisma.payment.create({
      data: {
        businessId: payment.businessId,
        saleId: payment.saleId,
        amount: payment.amount,
        method: payment.method,
        provider: payment.provider,
        status: payment.status,
        externalReference: payment.externalReference,
        reference: payment.reference,
      },
    });

    return {
      id: created.id,
      businessId: created.businessId,
      saleId: created.saleId,
      amount: decimalToNumber(created.amount),
      method: created.method,
      provider: created.provider,
      status: toPaymentStatus(created.status),
      externalReference: created.externalReference,
      reference: created.reference,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }

  async findById(
    businessId: string,
    paymentId: string,
  ): Promise<PaymentRecord | null> {
    const payment = await this.prisma.payment.findFirst({
      where: {
        id: paymentId,
        businessId,
      },
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
      provider: payment.provider,
      status: toPaymentStatus(payment.status),
      externalReference: payment.externalReference,
      reference: payment.reference,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }

  async findBySaleId(
    businessId: string,
    saleId: string,
  ): Promise<readonly PaymentRecord[]> {
    const payments =
      await this.prisma.payment.findMany({
        where: {
          businessId,
          saleId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

    return payments.map((payment) => ({
      id: payment.id,
      businessId: payment.businessId,
      saleId: payment.saleId,
      amount: decimalToNumber(payment.amount),
      method: payment.method,
      provider: payment.provider,
      status: toPaymentStatus(payment.status),
      externalReference: payment.externalReference,
      reference: payment.reference,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    }));
  }
}