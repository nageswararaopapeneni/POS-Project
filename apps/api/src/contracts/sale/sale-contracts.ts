export interface CreateSaleItemRequest {
  readonly productId: string;
  readonly quantity: number;
}

export interface CreateSaleRequest {
  readonly businessId: string;
  readonly branchId?: string | null;
  readonly discount?: number;
  readonly items: readonly CreateSaleItemRequest[];
}

export interface SaleItemResponse {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly lineTotal: number;
}

export interface SaleResponse {
  readonly id: string;
  readonly businessId: string;
  readonly branchId: string | null;
  readonly status: string;
  readonly subtotal: number;
  readonly discount: number;
  readonly total: number;
  readonly items: readonly SaleItemResponse[];
  readonly createdAt: string;
  readonly updatedAt: string;
}