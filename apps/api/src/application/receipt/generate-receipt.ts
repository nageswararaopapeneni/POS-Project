import {
  ApplicationError,
  ApplicationResult,
  SaleRepository,
  success,
} from "../index";
import {
  CreateReceiptRecord,
  ReceiptNumberGenerator,
  ReceiptOutput,
  ReceiptRepository,
} from "./receipt-output";
import { GenerateReceiptInput } from "./receipt-input";

export class GenerateReceiptUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly receiptRepository: ReceiptRepository,
    private readonly receiptNumberGenerator: ReceiptNumberGenerator,
  ) {}

  async execute(
    input: GenerateReceiptInput,
  ): Promise<ApplicationResult<ReceiptOutput>> {
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

    const existingReceipt =
      await this.receiptRepository.findBySaleId(
        businessId,
        saleId,
      );

    if (existingReceipt) {
      return success({
        id: existingReceipt.id,
        businessId: existingReceipt.businessId,
        saleId: existingReceipt.saleId,
        receiptNumber: existingReceipt.receiptNumber,
        createdAt: existingReceipt.createdAt,
        updatedAt: existingReceipt.updatedAt,
      });
    }

    const receiptNumber =
      this.receiptNumberGenerator.generate().trim();

    if (!receiptNumber) {
      return {
        success: false,
        error: new ApplicationError(
          "DEPENDENCY_ERROR",
          "Receipt number could not be generated.",
        ),
      };
    }

    const record: CreateReceiptRecord = {
      businessId,
      saleId,
      receiptNumber,
    };

    const receipt = await this.receiptRepository.create(record);

    return success({
      id: receipt.id,
      businessId: receipt.businessId,
      saleId: receipt.saleId,
      receiptNumber: receipt.receiptNumber,
      createdAt: receipt.createdAt,
      updatedAt: receipt.updatedAt,
    });
  }
}