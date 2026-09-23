import {
  ApplicationError,
  ApplicationResult,
  PaymentRepository,
  CreatePaymentRecord,
  SaleRepository,
  success,
} from "../index";
import { CreatePaymentInput } from "./payment-input";
import { PaymentOutput } from "./payment-output";

export class CreatePaymentUseCase {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly saleRepository: SaleRepository,
  ) {}

  async execute(
    input: CreatePaymentInput,
  ): Promise<ApplicationResult<PaymentOutput>> {
    const businessId = input.businessId.trim();
    const saleId = input.saleId.trim();
    const method = input.method.trim();
    const reference = input.reference?.trim() || null;
    const status = input.status ?? "pending";

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

    if (!method) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Payment method is required.",
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

    if (input.amount > sale.total) {
      return {
        success: false,
        error: new ApplicationError(
          "BUSINESS_RULE_VIOLATION",
          "Payment amount cannot exceed the sale total.",
        ),
      };
    }

    const existingPayments =
      await this.paymentRepository.findBySaleId(
        businessId,
        saleId,
      );

    const successfulAmount = existingPayments
      .filter((payment) => payment.status === "successful")
      .reduce((total, payment) => total + payment.amount, 0);

    if (successfulAmount + input.amount > sale.total) {
      return {
        success: false,
        error: new ApplicationError(
          "BUSINESS_RULE_VIOLATION",
          "Total successful payments cannot exceed the sale total.",
        ),
      };
    }

    const record: CreatePaymentRecord = {
      businessId,
      saleId,
      amount: input.amount,
      method,
      status,
      reference,
    };

    const payment = await this.paymentRepository.create(record);

    return success({
      id: payment.id,
      businessId: payment.businessId,
      saleId: payment.saleId,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      reference: payment.reference,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    });
  }
}