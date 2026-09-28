export interface ReconciliationRecord {
  readonly id: string;
  readonly businessId: string;
  readonly businessDate: Date;
  readonly totalSales: number;
  readonly cashTotal: number;
  readonly upiTotal: number;
  readonly cardTotal: number;
  readonly otherTotal: number;
  readonly expectedCash: number;
  readonly actualCash: number;
  readonly cashDifference: number;
  readonly status: string;
  readonly closedBy: string | null;
  readonly closedAt: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CreateReconciliationRecord {
  readonly businessId: string;
  readonly businessDate: Date;
  readonly totalSales: number;
  readonly cashTotal: number;
  readonly upiTotal: number;
  readonly cardTotal: number;
  readonly otherTotal: number;
  readonly expectedCash: number;
  readonly actualCash: number;
  readonly cashDifference: number;
  readonly status: string;
  readonly closedBy: string | null;
}

export interface ReconciliationRepository {
  findByBusinessDate(
    businessId: string,
    businessDate: Date,
  ): Promise<ReconciliationRecord | null>;

  create(
    input: CreateReconciliationRecord,
  ): Promise<ReconciliationRecord>;
}