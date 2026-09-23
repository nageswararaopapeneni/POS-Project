import type { SaleStatus } from "../value-objects/sale-status";

export interface SaleItem {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
  total: number;
}

export interface Sale {
  id: string;
  businessId: string;
  branchId?: string;
  deviceId?: string;
  userId: string;
  customerId?: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: SaleStatus;
  items: SaleItem[];
  createdAt: Date;
}