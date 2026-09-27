import type {
  SaleRecord,
  SaleRepository,
} from "../../../../application";

export class InMemorySaleRepository implements SaleRepository {
  private readonly sales = new Map<string, SaleRecord>();

  async create(sale: SaleRecord): Promise<SaleRecord> {
    this.sales.set(sale.id, sale);
    return sale;
  }

  async findById(
    businessId: string,
    saleId: string,
  ): Promise<SaleRecord | null> {
    const sale = this.sales.get(saleId);

    if (!sale || sale.businessId !== businessId) {
      return null;
    }

    return sale;
  }

  async findMany(
    businessId: string,
    limit: number,
    offset: number,
  ): Promise<readonly SaleRecord[]> {
    return Array.from(this.sales.values())
      .filter((sale) => sale.businessId === businessId)
      .sort(
        (a, b) =>
          b.createdAt.getTime() - a.createdAt.getTime(),
      )
      .slice(offset, offset + limit);
  }
}