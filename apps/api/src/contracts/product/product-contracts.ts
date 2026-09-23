export interface CreateProductRequest {
  readonly businessId: string;
  readonly name: string;
  readonly price: number;
  readonly sku?: string | null;
  readonly barcode?: string | null;
}

export interface ProductResponse {
  readonly id: string;
  readonly businessId: string;
  readonly name: string;
  readonly sku: string | null;
  readonly barcode: string | null;
  readonly price: number;
  readonly active: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface FindProductByBarcodeRequest {
  readonly businessId: string;
  readonly barcode: string;
}