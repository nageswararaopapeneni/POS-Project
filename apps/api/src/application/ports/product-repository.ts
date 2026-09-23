export interface ProductRecord {
  readonly id: string;
  readonly businessId: string;
  readonly name: string;
  readonly sku?: string | null;
  readonly barcode?: string | null;
  readonly price: number;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CreateProductRecord {
  readonly businessId: string;
  readonly name: string;
  readonly sku?: string | null;
  readonly barcode?: string | null;
  readonly price: number;
}

export interface ProductRepository {
  findById(
    businessId: string,
    productId: string,
  ): Promise<ProductRecord | null>;

  findByBarcode(
    businessId: string,
    barcode: string,
  ): Promise<ProductRecord | null>;

  findBySku(
    businessId: string,
    sku: string,
  ): Promise<ProductRecord | null>;

  create(input: CreateProductRecord): Promise<ProductRecord>;
}