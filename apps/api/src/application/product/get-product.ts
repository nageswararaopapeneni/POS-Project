import {
  ApplicationError,
  ApplicationResult,
  ProductRepository,
  success,
} from "../index";
import { GetProductInput } from "./product-input";
import { ProductOutput } from "./product-output";

export class GetProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(
    input: GetProductInput,
  ): Promise<ApplicationResult<ProductOutput>> {
    const businessId = input.businessId.trim();
    const productId = input.productId.trim();

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    if (!productId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Product ID is required.",
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
          "Product was not found.",
        ),
      };
    }

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