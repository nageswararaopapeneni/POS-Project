import { ApplicationError } from "../common/application-error";
import {
  type ApplicationResult,
  success,
} from "../common/application-result";
import type { GetCashDrawerEventsInput } from "./cash-drawer-input";
import type {
  CashDrawerEventRecord,
  CashDrawerRepository,
} from "./cash-drawer-output";

export class GetCashDrawerEventsUseCase {
  constructor(
    private readonly cashDrawerRepository: CashDrawerRepository,
  ) {}

  async execute(
    input: GetCashDrawerEventsInput,
  ): Promise<ApplicationResult<readonly CashDrawerEventRecord[]>> {
    const businessId = input.businessId.trim();

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    const from = input.from ? new Date(input.from) : undefined;
    const to = input.to ? new Date(input.to) : undefined;

    if (from && Number.isNaN(from.getTime())) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Invalid from date.",
        ),
      };
    }

    if (to && Number.isNaN(to.getTime())) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Invalid to date.",
        ),
      };
    }

    if (from && to && from >= to) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "The from date must be before the to date.",
        ),
      };
    }

    return success(
      await this.cashDrawerRepository.findMany(businessId, {
        from,
        to,
        saleId: input.saleId?.trim() || undefined,
        exceptionStatus: input.exceptionStatus,
      }),
    );
  }
}