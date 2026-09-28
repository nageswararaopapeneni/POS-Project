import { ApplicationError } from "../common/application-error";
import {
  type ApplicationResult,
  success,
} from "../common/application-result";
import type { RecordCashDrawerEventInput } from "./cash-drawer-input";
import type {
  CashDrawerEventRecord,
  CashDrawerRepository,
} from "./cash-drawer-output";

export class RecordCashDrawerEventUseCase {
  constructor(
    private readonly cashDrawerRepository: CashDrawerRepository,
  ) {}

  async execute(
    input: RecordCashDrawerEventInput,
  ): Promise<ApplicationResult<CashDrawerEventRecord>> {
    const businessId = input.businessId.trim();
    const reason = input.reason.trim();

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    if (!reason) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Drawer event reason is required.",
        ),
      };
    }

    if (input.eventType !== "open" && input.eventType !== "close") {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Invalid drawer event type.",
        ),
      };
    }

    const exceptionStatus =
      input.exceptionStatus === "exception" ? "exception" : "none";

    const openedAt = input.openedAt
      ? new Date(input.openedAt)
      : input.eventType === "open"
        ? new Date()
        : null;

    const closedAt = input.closedAt
      ? new Date(input.closedAt)
      : input.eventType === "close"
        ? new Date()
        : null;

    if (openedAt && Number.isNaN(openedAt.getTime())) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Invalid drawer opened timestamp.",
        ),
      };
    }

    if (closedAt && Number.isNaN(closedAt.getTime())) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Invalid drawer closed timestamp.",
        ),
      };
    }

    return success(
      await this.cashDrawerRepository.create({
        businessId,
        branchId: input.branchId?.trim() || null,
        deviceId: input.deviceId?.trim() || null,
        userId: input.userId?.trim() || null,
        eventType: input.eventType,
        reason,
        saleId: input.saleId?.trim() || null,
        exceptionStatus,
        openedAt,
        closedAt,
      }),
    );
  }
}