import {
  ApplicationError,
  ApplicationResult,
  PaymentRepository,
  success,
} from "../index";
import { GetPaymentsBySaleInput } from "./payment-input";
import { PaymentOutput } from "./payment-output";

export class GetPaymentsBySaleUseCase {
  constructor(
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(
    input: GetPaymentsBySaleInput,
  ): Promise<ApplicationResult<readonly PaymentOutput[]>> {
    const businessId = input.businessId.trim();
    const saleId = input.saleId.trim();

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

    const payments =
      await this.paymentRepository.findBySaleId(
        businessId,
        saleId,
      );

    return success(
      payments.map((payment) => ({
        id: payment.id,
        businessId: payment.businessId,
        saleId: payment.saleId,
        amount: payment.amount,
        method: payment.method,
        status: payment.status,
        reference: payment.reference,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
      })),
    );
  }
}