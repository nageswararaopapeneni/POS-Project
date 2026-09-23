import {
  ApplicationError,
  ApplicationResult,
  ProductRepository,
  success,
} from "../index";
import { FindProductByBarcodeInput } from "./product-input";
import { ProductOutput } from "./product-output";

export class FindProductByBarcodeUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(
    input: FindProductByBarcodeInput,
  ): Promise<ApplicationResult<ProductOutput>> {
    const businessId = input.businessId.trim();
    const barcode = input.barcode.trim();

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    if (!barcode) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Barcode is required.",
        ),
      };
    }

    const product = await this.productRepository.findByBarcode(
      businessId,
      barcode,
    );

    if (!product) {
      return {
        success: false,
        error: new ApplicationError(
          "NOT_FOUND",
          "Product was not found for the supplied barcode.",
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