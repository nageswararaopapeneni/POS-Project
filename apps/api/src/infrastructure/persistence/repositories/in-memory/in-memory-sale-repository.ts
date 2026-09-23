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

  async findById(id: string): Promise<SaleRecord | null> {
    return this.sales.get(id) ?? null;
  }
}