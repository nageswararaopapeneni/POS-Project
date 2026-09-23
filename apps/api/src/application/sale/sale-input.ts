export interface CreateSaleItemInput {
  readonly productId: string;
  readonly quantity: number;
}

export interface CreateSaleInput {
  readonly businessId: string;
  readonly branchId?: string | null;
  readonly discount?: number;
  readonly items: readonly CreateSaleItemInput[];
}

export interface GetSaleInput {
  readonly businessId: string;
  readonly saleId: string;
}