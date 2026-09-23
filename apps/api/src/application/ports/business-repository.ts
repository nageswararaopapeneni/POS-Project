export interface BusinessRecord {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CreateBusinessRecord {
  readonly name: string;
}

export interface BusinessRepository {
  findById(id: string): Promise<BusinessRecord | null>;

  findByName(name: string): Promise<BusinessRecord | null>;

  create(input: CreateBusinessRecord): Promise<BusinessRecord>;
}