import {
  ApplicationError,
  ApplicationResult,
  CreateProductRecord,
  ProductRepository,
  success,
} from "../index";
import { CreateProductInput } from "./product-input";
import { ProductOutput } from "./product-output";

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(
    input: CreateProductInput,
  ): Promise<ApplicationResult<ProductOutput>> {
    const businessId = input.businessId.trim();
    const name = input.name.trim();
    const sku = input.sku?.trim() || null;
    const barcode = input.barcode?.trim() || null;

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    if (!name) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Product name is required.",
        ),
      };
    }

    if (!Number.isFinite(input.price) || input.price < 0) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Product price must be a valid non-negative number.",
        ),
      };
    }

    if (sku) {
      const existingSku = await this.productRepository.findBySku(
        businessId,
        sku,
      );

      if (existingSku) {
        return {
          success: false,
          error: new ApplicationError(
            "CONFLICT",
            "A product with this SKU already exists.",
          ),
        };
      }
    }

    if (barcode) {
      const existingBarcode =
        await this.productRepository.findByBarcode(
          businessId,
          barcode,
        );

      if (existingBarcode) {
        return {
          success: false,
          error: new ApplicationError(
            "CONFLICT",
            "A product with this barcode already exists.",
          ),
        };
      }
    }

    const record: CreateProductRecord = {
      businessId,
      name,
      sku,
      barcode,
      price: input.price,
    };

    const product = await this.productRepository.create(record);

    return success({
      id: product.id,
      businessId: product.businessId,
      name: product.name,
      sku: product.sku,
      barcode: product.barcode,
      price: product.price,
      active: product.active,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }
}