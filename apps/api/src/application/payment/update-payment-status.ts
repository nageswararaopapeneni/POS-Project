import {
  ApplicationError,
  ApplicationResult,
  PaymentRepository,
  PaymentStatus,
  success,
} from "../index";
import { UpdatePaymentStatusInput } from "./payment-input";
import { PaymentOutput } from "./payment-output";

function toPaymentStatus(value: string): PaymentStatus | null {
  switch (value.trim().toLowerCase()) {
    case "pending":
      return "pending";
    case "successful":
      return "successful";
    case "failed":
      return "failed";
    case "reversed":
      return "reversed";
    default:
      return null;
  }
}

function toOutput(payment: {
  id: string;
  businessId: string;
  saleId: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  provider?: string | null;
  externalReference?: string | null;
  reference?: string | null;
  idempotencyKey?: string | null;
  createdAt: Date;
  updatedAt: Date;
}): PaymentOutput {
  return {
    id: payment.id,
    businessId: payment.businessId,
    saleId: payment.saleId,
    amount: payment.amount,
    method: payment.method,
    status: payment.status,
    provider: payment.provider,
    externalReference: payment.externalReference,
    reference: payment.reference,
    idempotencyKey: payment.idempotencyKey,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  };
}

export class UpdatePaymentStatusUseCase {
  constructor(
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(
    input: UpdatePaymentStatusInput,
  ): Promise<ApplicationResult<PaymentOutput>> {
    const businessId = input.businessId.trim();
    const paymentId = input.paymentId.trim();
    const requestedStatus = toPaymentStatus(input.status);

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    if (!paymentId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Payment ID is required.",
        ),
      };
    }

    if (!requestedStatus) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Payment status must be pending, successful, failed, or reversed.",
        ),
      };
    }

    const payment = await this.paymentRepository.findById(
      businessId,
      paymentId,
    );

    if (!payment) {
      return {
        success: false,
        error: new ApplicationError(
          "NOT_FOUND",
          "Payment was not found.",
        ),
      };
    }

    if (payment.status === requestedStatus) {
      return success(toOutput(payment));
    }

    const allowed =
      (payment.status === "pending" &&
        (requestedStatus === "successful" ||
          requestedStatus === "failed")) ||
      (payment.status === "successful" &&
        requestedStatus === "reversed");

    if (!allowed) {
      return {
        success: false,
        error: new ApplicationError(
          "BUSINESS_RULE_VIOLATION",
          `Payment status cannot change from ${payment.status} to ${requestedStatus}.`,
        ),
      };
    }

    const updated = await this.paymentRepository.updateStatus({
      paymentId,
      businessId,
      status: requestedStatus,
    });

    return success(toOutput(updated));
  }
}