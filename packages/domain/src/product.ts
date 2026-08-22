import type { EntityId, EntityStatus } from "./types";

export interface Product {
  id: EntityId;
  businessId: EntityId;
  name: string;
  sku?: string;
  barcode?: string;
  categoryId?: EntityId;
  brand?: string;
  costPrice: number;
  sellingPrice: number;
  tax?: number;
  unit?: string;
  image?: string;
  status: EntityStatus;
}