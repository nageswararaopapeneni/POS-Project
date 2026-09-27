import {
  ApplicationError,
  ApplicationResult,
  SaleRepository,
  success,
} from "../index";
import { GetSalesInput } from "./sales-history-input";
import { SalesHistoryOutput } from "./sales-history-output";

export class GetSalesUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
  ) {}

  async execute(
    input: GetSalesInput,
  ): Promise<ApplicationResult<SalesHistoryOutput>> {
    const businessId = input.businessId.trim();

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    const limit = input.limit ?? 50;
    const offset = input.offset ?? 0;

    if (
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Limit must be between 1 and 100.",
        ),
      };
    }

    if (!Number.isInteger(offset) || offset < 0) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Offset must be a non-negative integer.",
        ),
      };
    }

    const sales = await this.saleRepository.findMany(
      businessId,
      limit,
      offset,
    );

    return success(
      sales.map((sale) => ({
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
      })),
    );
  }
}