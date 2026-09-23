import type {
  ProductRecord,
  ProductRepository,
} from "../../../../application";

export class InMemoryProductRepository implements ProductRepository {
  private readonly products = new Map<string, ProductRecord>();

  async create(product: ProductRecord): Promise<ProductRecord> {
    this.products.set(product.id, product);
    return product;
  }

  async findById(id: string): Promise<ProductRecord | null> {
    return this.products.get(id) ?? null;
  }

  async findByBarcode(
    businessId: string,
    barcode: string,
  ): Promise<ProductRecord | null> {
    for (const product of this.products.values()) {
      if (
        product.businessId === businessId &&
        product.barcode === barcode
      ) {
        return product;
      }
    }

    return null;
  }

  async findBySku(
    businessId: string,
    sku: string,
  ): Promise<ProductRecord | null> {
    for (const product of this.products.values()) {
      if (
        product.businessId === businessId &&
        product.sku === sku
      ) {
        return product;
      }
    }

    return null;
  }
}