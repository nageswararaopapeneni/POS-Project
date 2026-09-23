import {
  ApplicationError,
  ApplicationResult,
  ProductRepository,
  SaleRepository,
  CreateSaleRecord,
  CreateSaleItemRecord,
  success,
} from "../index";
import { CreateSaleInput } from "./sale-input";
import { SaleOutput } from "./sale-output";

export class CreateSaleUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly saleRepository: SaleRepository,
  ) {}

  async execute(
    input: CreateSaleInput,
  ): Promise<ApplicationResult<SaleOutput>> {
    const businessId = input.businessId.trim();
    const branchId = input.branchId?.trim() || null;
    const discount = input.discount ?? 0;

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    if (!Array.isArray(input.items) || input.items.length === 0) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "At least one sale item is required.",
        ),
      };
    }

    if (!Number.isFinite(discount) || discount < 0) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Discount must be a valid non-negative number.",
        ),
      };
    }

    const saleItems: CreateSaleItemRecord[] = [];

    for (const item of input.items) {
      const productId = item.productId.trim();

      if (!productId) {
        return {
          success: false,
          error: new ApplicationError(
            "VALIDATION_ERROR",
            "Product ID is required for every sale item.",
          ),
        };
      }

      if (
        !Number.isFinite(item.quantity) ||
        item.quantity <= 0
      ) {
        return {
          success: false,
          error: new ApplicationError(
            "VALIDATION_ERROR",
            "Sale item quantity must be greater than zero.",
          ),
        };
      }

      const product = await this.productRepository.findById(
        businessId,
        productId,
      );

      if (!product) {
        return {
          success: false,
          error: new ApplicationError(
            "NOT_FOUND",
            `Product ${productId} was not found.`,
          ),
        };
      }

      if (!product.active) {
        return {
          success: false,
          error: new ApplicationError(
            "BUSINESS_RULE_VIOLATION",
            `Product ${product.name} is inactive.`,
          ),
        };
      }

      const lineTotal = product.price * item.quantity;

      saleItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        lineTotal,
      });
    }

    const subtotal = saleItems.reduce(
      (total, item) => total + item.lineTotal,
      0,
    );

    if (discount > subtotal) {
      return {
        success: false,
        error: new ApplicationError(
          "BUSINESS_RULE_VIOLATION",
          "Discount cannot exceed the sale subtotal.",
        ),
      };
    }

    const total = subtotal - discount;

    const record: CreateSaleRecord = {
      businessId,
      branchId,
      subtotal,
      discount,
      total,
      items: saleItems,
    };

    const sale = await this.saleRepository.create(record);

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