export interface ProductOutput {
  readonly id: string;
  readonly businessId: string;
  readonly name: string;
  readonly sku: string | null | undefined;
  readonly barcode: string | null | undefined;
  readonly price: number;
  readonly active: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}