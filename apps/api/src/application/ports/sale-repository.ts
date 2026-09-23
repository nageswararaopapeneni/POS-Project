export interface SaleItemRecord {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly lineTotal: number;
}

export interface SaleRecord {
  readonly id: string;
  readonly businessId: string;
  readonly branchId?: string | null;
  readonly status: string;
  readonly subtotal: number;
  readonly discount: number;
  readonly total: number;
  readonly items: readonly SaleItemRecord[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CreateSaleItemRecord {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly lineTotal: number;
}

export interface CreateSaleRecord {
  readonly businessId: string;
  readonly branchId?: string | null;
  readonly subtotal: number;
  readonly discount: number;
  readonly total: number;
  readonly items: readonly CreateSaleItemRecord[];
}

export interface SaleRepository {
  findById(
    businessId: string,
    saleId: string,
  ): Promise<SaleRecord | null>;

  create(input: CreateSaleRecord): Promise<SaleRecord>;
}