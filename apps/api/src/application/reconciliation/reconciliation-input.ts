export interface CreateReconciliationInput {
  readonly businessId: string;
  readonly businessDate: string;
  readonly actualCash: number;
  readonly closedBy?: string;
}

export interface GetReconciliationInput {
  readonly businessId: string;
  readonly businessDate: string;
}