import { Injectable } from "@nestjs/common";

import type {
  CreatePaymentRecord,
  PaymentRecord,
  PaymentRepository,
  PaymentStatus,
  UpdatePaymentStatusRecord,
} from "../../../../application";

import {
  PrismaClientService,
  decimalToNumber,
} from "../../prisma";

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

    return this.toRecord(payment);
  }

  async findBySaleId(
    businessId: string,
    saleId: string,
  ): Promise<readonly PaymentRecord[]> {
    const payments = await this.prisma.payment.findMany({
      where: {
        businessId,
        saleId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return payments.map((payment) =>
      this.toRecord(payment),
    );
  }

  async findByIdempotencyKey(
    businessId: string,
    idempotencyKey: string,
  ): Promise<PaymentRecord | null> {
    const payment = await this.prisma.payment.findFirst({
      where: {
        businessId,
        idempotencyKey,
      },
    });

    if (!payment) {
      return null;
    }

    return this.toRecord(payment);
  }

  async create(
    input: CreatePaymentRecord,
  ): Promise<PaymentRecord> {
    const payment = await this.prisma.payment.create({
      data: {
        businessId: input.businessId,
        saleId: input.saleId,
        amount: input.amount,
        method: input.method,
        status: input.status,
        provider: input.provider ?? null,
        externalReference:
          input.externalReference ?? null,
        reference: input.reference ?? null,
        idempotencyKey:
          input.idempotencyKey ?? null,
      },
    });

    return this.toRecord(payment);
  }

  async updateStatus(
    input: UpdatePaymentStatusRecord,
  ): Promise<PaymentRecord> {
    const existing = await this.prisma.payment.findFirst({
      where: {
        id: input.paymentId,
        businessId: input.businessId,
      },
    });

    if (!existing) {
      throw new Error("Payment not found");
    }

    const payment = await this.prisma.payment.update({
      where: {
        id: input.paymentId,
      },
      data: {
        status: input.status,
      },
    });

    return this.toRecord(payment);
  }

  private toRecord(payment: {
    id: string;
    businessId: string;
    saleId: string;
    amount: {
      toNumber(): number;
    };
    method: string;
    status: string;
    provider: string | null;
    externalReference: string | null;
    reference: string | null;
    idempotencyKey: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): PaymentRecord {
    return {
      id: payment.id,
      businessId: payment.businessId,
      saleId: payment.saleId,
      amount: decimalToNumber(payment.amount),
      method: payment.method,
      status: toPaymentStatus(payment.status),
      provider: payment.provider,
      externalReference:
        payment.externalReference,
      reference: payment.reference,
      idempotencyKey:
        payment.idempotencyKey,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }
}