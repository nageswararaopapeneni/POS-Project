import type {
  BusinessRecord,
  BusinessRepository,
} from "../../../../application";

export class InMemoryBusinessRepository implements BusinessRepository {
  private readonly businesses = new Map<string, BusinessRecord>();

  async create(business: BusinessRecord): Promise<BusinessRecord> {
    this.businesses.set(business.id, business);
    return business;
  }

  async findById(id: string): Promise<BusinessRecord | null> {
    return this.businesses.get(id) ?? null;
  }

  async findByName(name: string): Promise<BusinessRecord | null> {
    for (const business of this.businesses.values()) {
      if (business.name === name) {
        return business;
      }
    }

    return null;
  }
}