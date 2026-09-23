export type ProductStatus = "ACTIVE" | "INACTIVE";

export interface Product {
  id: string;
  businessId: string;
  name: string;
  sku?: string;
  barcode?: string;
  categoryId?: string;
  brand?: string;
  costPrice?: number;
  sellingPrice: number;
  tax?: number;
  unit: string;
  image?: string;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}