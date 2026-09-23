export interface SaleItemOutput {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly lineTotal: number;
}

export interface SaleOutput {
  readonly id: string;
  readonly businessId: string;
  readonly branchId: string | null | undefined;
  readonly status: string;
  readonly subtotal: number;
  readonly discount: number;
  readonly total: number;
  readonly items: readonly SaleItemOutput[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}