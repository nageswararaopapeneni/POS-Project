export type CashDrawerEventType = "open" | "close";

export type CashDrawerExceptionStatus = "none" | "exception";

export interface RecordCashDrawerEventInput {
  readonly businessId: string;
  readonly branchId?: string;
  readonly deviceId?: string;
  readonly userId?: string;
  readonly eventType: CashDrawerEventType;
  readonly reason: string;
  readonly saleId?: string;
  readonly exceptionStatus?: CashDrawerExceptionStatus;
  readonly openedAt?: string;
  readonly closedAt?: string;
}

export interface GetCashDrawerEventsInput {
  readonly businessId: string;
  readonly from?: string;
  readonly to?: string;
  readonly saleId?: string;
  readonly exceptionStatus?: CashDrawerExceptionStatus;
}