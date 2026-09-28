import { randomUUID } from "node:crypto";

import type {
  CreatePaymentRecord,
  PaymentRecord,
  PaymentRepository,
  UpdatePaymentStatusRecord,
} from "../../../../application";

export class InMemoryPaymentRepository
  implements PaymentRepository
{
  private readonly payments = new Map<
    string,
    PaymentRecord
  >();

  async findById(
    businessId: string,
    paymentId: string,
  ): Promise<PaymentRecord | null> {
    const payment = this.payments.get(paymentId);

    if (
      !payment ||
      payment.businessId !== businessId
    ) {
      return null;
    }

    return payment;
  }

  async findBySaleId(
    businessId: string,
    saleId: string,
  ): Promise<readonly PaymentRecord[]> {
    return Array.from(this.payments.values())
      .filter(
        (payment) =>
          payment.businessId === businessId &&
          payment.saleId === saleId,
      )
      .sort(
        (a, b) =>
          a.createdAt.getTime() -
          b.createdAt.getTime(),
      );
  }

  async findByIdempotencyKey(
    businessId: string,
    idempotencyKey: string,
  ): Promise<PaymentRecord | null> {
    for (const payment of this.payments.values()) {
      if (
        payment.businessId === businessId &&
        payment.idempotencyKey === idempotencyKey
      ) {
        return payment;
      }
    }

    return null;
  }

  async create(
    payment: CreatePaymentRecord,
  ): Promise<PaymentRecord> {
    const now = new Date();

    const record: PaymentRecord = {
      id: randomUUID(),
      businessId: payment.businessId,
      saleId: payment.saleId,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      provider: payment.provider ?? null,
      externalReference:
        payment.externalReference ?? null,
      reference: payment.reference ?? null,
      idempotencyKey:
        payment.idempotencyKey ?? null,
      createdAt: now,
      updatedAt: now,
    };

    this.payments.set(record.id, record);

    return record;
  }

  async updateStatus(
    input: UpdatePaymentStatusRecord,
  ): Promise<PaymentRecord> {
    const existing = this.payments.get(input.paymentId);

    if (
      !existing ||
      existing.businessId !== input.businessId
    ) {
      throw new Error("Payment not found");
    }

    const updated: PaymentRecord = {
      ...existing,
      status: input.status,
      updatedAt: new Date(),
    };

    this.payments.set(input.paymentId, updated);

    return updated;
  }
}