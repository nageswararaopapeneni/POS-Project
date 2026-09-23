import {
  ApplicationError,
  ApplicationResult,
} from "../index";
import { GetReceiptInput } from "./receipt-input";
import {
  ReceiptOutput,
  ReceiptRecord,
  ReceiptRepository,
} from "./receipt-output";

export interface ReceiptRepositoryPort {
  findById(
    businessId: string,
    receiptId: string,
  ): Promise<ReceiptRecord | null>;
}

export class GetReceiptUseCase {
  constructor(
    private readonly receiptRepository: ReceiptRepositoryPort,
  ) {}

  async execute(
    input: GetReceiptInput,
  ): Promise<ApplicationResult<ReceiptOutput>> {
    const businessId = input.businessId.trim();
    const receiptId = input.receiptId.trim();

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    if (!receiptId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Receipt ID is required.",
        ),
      };
    }

    const receipt = await this.receiptRepository.findById(
      businessId,
      receiptId,
    );

    if (!receipt) {
      return {
        success: false,
        error: new ApplicationError(
          "NOT_FOUND",
          "Receipt was not found.",
        ),
      };
    }

    return {
      success: true,
      data: {
        id: receipt.id,
        businessId: receipt.businessId,
        saleId: receipt.saleId,
        receiptNumber: receipt.receiptNumber,
        createdAt: receipt.createdAt,
        updatedAt: receipt.updatedAt,
      },
    };
  }
}