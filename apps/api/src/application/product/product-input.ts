export interface CreateProductInput {
  readonly businessId: string;
  readonly name: string;
  readonly price: number;
  readonly sku?: string | null;
  readonly barcode?: string | null;
}

export interface GetProductInput {
  readonly businessId: string;
  readonly productId: string;
}

export interface FindProductByBarcodeInput {
  readonly businessId: string;
  readonly barcode: string;
}