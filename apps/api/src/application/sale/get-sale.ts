import {
  ApplicationError,
  ApplicationResult,
  SaleRepository,
  success,
} from "../index";
import { GetSaleInput } from "./sale-input";
import { SaleOutput } from "./sale-output";

export class GetSaleUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
  ) {}

  async execute(
    input: GetSaleInput,
  ): Promise<ApplicationResult<SaleOutput>> {
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

    return success({
      id: sale.id,
      businessId: sale.businessId,
      branchId: sale.branchId,
      status: sale.status,
      subtotal: sale.subtotal,
      discount: sale.discount,
      total: sale.total,
      items: sale.items,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
    });
  }
}