import {
  ApplicationError,
  ApplicationResult,
  CreatePaymentRecord,
  PaymentRepository,
  SaleRepository,
  success,
} from "../index";
import {
  PaymentAdapterRegistry,
  type PaymentMethod,
} from "../payment-adapters";
import { CreatePaymentInput } from "./payment-input";
import { PaymentOutput } from "./payment-output";

export class CreatePaymentUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentAdapterRegistry: PaymentAdapterRegistry,
  ) {}

  async execute(
    input: CreatePaymentInput,
  ): Promise<ApplicationResult<PaymentOutput>> {
    const businessId = input.businessId.trim();
    const saleId = input.saleId.trim();
    const normalizedMethod = input.method.trim().toLowerCase();
    const provider = input.provider?.trim() || null;
    const externalReference =
      input.externalReference?.trim() || null;
    const reference = input.reference?.trim() || null;
    const idempotencyKey =
      input.idempotencyKey?.trim() || null;

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    if (!saleId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Sale ID is required.",
        ),
      };
    }

    if (!Number.isFinite(input.amount) || input.amount <= 0) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Payment amount must be greater than zero.",
        ),
      };
    }

    if (
      normalizedMethod !== "cash" &&
      normalizedMethod !== "upi" &&
      normalizedMethod !== "card" &&
      normalizedMethod !== "other"
    ) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          `Unsupported payment method: ${normalizedMethod}.`,
        ),
      };
    }

    const method: PaymentMethod = normalizedMethod;

    const sale = await this.saleRepository.findById(
      businessId,
      saleId,
    );

    if (!sale) {
      return {
        success: false,
        error: new ApplicationError(
          "NOT_FOUND",
          "Sale was not found.",
        ),
      };
    }

    if (sale.status !== "completed") {
      return {
        success: false,
        error: new ApplicationError(
          "BUSINESS_RULE_VIOLATION",
          "Payment can only be recorded for a completed sale.",
        ),
      };
    }

    if (idempotencyKey) {
      const existingPayment =
        await this.paymentRepository.findByIdempotencyKey(
          businessId,
          idempotencyKey,
        );

      if (existingPayment) {
        return success({
          id: existingPayment.id,
          businessId: existingPayment.businessId,
          saleId: existingPayment.saleId,
          amount: existingPayment.amount,
          method: existingPayment.method,
          status: existingPayment.status,
          provider: existingPayment.provider,
          externalReference:
            existingPayment.externalReference,
          reference: existingPayment.reference,
          idempotencyKey:
            existingPayment.idempotencyKey,
          createdAt: existingPayment.createdAt,
          updatedAt: existingPayment.updatedAt,
        });
      }
    }

    const existingPayments =
      await this.paymentRepository.findBySaleId(
        businessId,
        saleId,
      );

    const successfulAmount = existingPayments
      .filter(
        (payment) => payment.status === "successful",
      )
      .reduce(
        (total, payment) => total + payment.amount,
        0,
      );

    const remainingAmount =
      sale.total - successfulAmount;

    if (input.amount > remainingAmount) {
      return {
        success: false,
        error: new ApplicationError(
          "BUSINESS_RULE_VIOLATION",
          "Payment amount cannot exceed the remaining sale balance.",
        ),
      };
    }

    const adapter =
      this.paymentAdapterRegistry.getAdapter(method);

    const adapterResult = await adapter.process({
      businessId,
      saleId,
      amount: input.amount,
      method,
      provider,
      externalReference,
      reference,
      idempotencyKey,
    });

    const record: CreatePaymentRecord = {
      businessId,
      saleId,
      amount: input.amount,
      method,
      status: adapterResult.status,
      provider: adapterResult.provider,
      externalReference:
        adapterResult.externalReference,
      reference: adapterResult.reference,
      idempotencyKey,
    };

    const payment =
      await this.paymentRepository.create(record);

    return success({
      id: payment.id,
      businessId: payment.businessId,
      saleId: payment.saleId,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      provider: payment.provider,
      externalReference:
        payment.externalReference,
      reference: payment.reference,
      idempotencyKey: payment.idempotencyKey,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    });
  }
}