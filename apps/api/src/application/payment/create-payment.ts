import {
  ApplicationError,
  ApplicationResult,
  PaymentRepository,
  SaleRepository,
  CreatePaymentRecord,
  success,
} from "../index";
import { CreatePaymentInput } from "./payment-input";
import { PaymentOutput } from "./payment-output";

export class CreatePaymentUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(
    input: CreatePaymentInput,
  ): Promise<ApplicationResult<PaymentOutput>> {
    const businessId = input.businessId.trim();
    const saleId = input.saleId.trim();
    const method = input.method.trim();
    const reference = input.reference?.trim() || null;

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

    if (!method) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Payment method is required.",
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

    if (sale.status !== "completed") {
      return {
        success: false,
        error: new ApplicationError(
          "BUSINESS_RULE_VIOLATION",
          "Payment can only be recorded for a completed sale.",
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

    const remainingAmount = sale.total - successfulAmount;

    if (input.amount > remainingAmount) {
      return {
        success: false,
        error: new ApplicationError(
          "BUSINESS_RULE_VIOLATION",
          "Payment amount cannot exceed the remaining sale balance.",
        ),
      };
    }

    const record: CreatePaymentRecord = {
      businessId,
      saleId,
      amount: input.amount,
      method,
      status: "successful",
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