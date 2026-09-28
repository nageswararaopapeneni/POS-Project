export interface SalesReportSummary {
  readonly count: number;
  readonly subtotal: number;
  readonly discount: number;
  readonly total: number;
}

export interface ProductSalesReport {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly total: number;
}

export interface PaymentMethodReport {
  readonly method: string;
  readonly count: number;
  readonly total: number;
}

export interface BasicReportsOutput {
  readonly period: {
    readonly from: Date;
    readonly to: Date;
  };
  readonly sales: SalesReportSummary;
  readonly products: readonly ProductSalesReport[];
  readonly payments: readonly PaymentMethodReport[];
}