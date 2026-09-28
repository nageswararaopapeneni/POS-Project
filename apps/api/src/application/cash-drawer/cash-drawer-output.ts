import type {
  CashDrawerEventType,
  CashDrawerExceptionStatus,
} from "./cash-drawer-input";

export interface CashDrawerEventRecord {
  readonly id: string;
  readonly businessId: string;
  readonly branchId: string | null;
  readonly deviceId: string | null;
  readonly userId: string | null;
  readonly eventType: CashDrawerEventType;
  readonly reason: string;
  readonly saleId: string | null;
  readonly exceptionStatus: CashDrawerExceptionStatus;
  readonly openedAt: Date | null;
  readonly closedAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CreateCashDrawerEventRecord {
  readonly businessId: string;
  readonly branchId: string | null;
  readonly deviceId: string | null;
  readonly userId: string | null;
  readonly eventType: CashDrawerEventType;
  readonly reason: string;
  readonly saleId: string | null;
  readonly exceptionStatus: CashDrawerExceptionStatus;
  readonly openedAt: Date | null;
  readonly closedAt: Date | null;
}

export interface CashDrawerRepository {
  create(
    input: CreateCashDrawerEventRecord,
  ): Promise<CashDrawerEventRecord>;

  findMany(
    businessId: string,
    filters: {
      readonly from?: Date;
      readonly to?: Date;
      readonly saleId?: string;
      readonly exceptionStatus?: CashDrawerExceptionStatus;
    },
  ): Promise<readonly CashDrawerEventRecord[]>;
}