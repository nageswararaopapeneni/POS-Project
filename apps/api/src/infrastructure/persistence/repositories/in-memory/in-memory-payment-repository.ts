import type {
  PaymentRecord,
  PaymentRepository,
} from "../../../../application";

export class InMemoryPaymentRepository implements PaymentRepository {
  private readonly payments = new Map<string, PaymentRecord>();

  async create(payment: PaymentRecord): Promise<PaymentRecord> {
    this.payments.set(payment.id, payment);
    return payment;
  }

  async findById(id: string): Promise<PaymentRecord | null> {
    return this.payments.get(id) ?? null;
  }

  async findBySaleId(saleId: string): Promise<PaymentRecord[]> {
    return Array.from(this.payments.values()).filter(
      (payment) => payment.saleId === saleId,
    );
  }
}