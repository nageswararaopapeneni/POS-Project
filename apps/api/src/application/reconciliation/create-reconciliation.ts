import { ApplicationError } from "../common/application-error";
import {
  type ApplicationResult,
  success,
} from "../common/application-result";
import type { CreateReconciliationInput } from "./reconciliation-input";
import type {
  ReconciliationRecord,
  ReconciliationRepository,
} from "./reconciliation-output";

export class CreateReconciliationUseCase {
  constructor(
    private readonly reconciliationRepository: ReconciliationRepository,
  ) {}

  async execute(
    input: CreateReconciliationInput,
  ): Promise<ApplicationResult<ReconciliationRecord>> {
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

    const businessDate = new Date(`${input.businessDate}T00:00:00.000Z`);

    if (Number.isNaN(businessDate.getTime())) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Invalid business date.",
        ),
      };
    }

    if (!Number.isFinite(input.actualCash) || input.actualCash < 0) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Actual cash must be a non-negative number.",
        ),
      };
    }

    const existing =
      await this.reconciliationRepository.findByBusinessDate(
        businessId,
        businessDate,
      );

    if (existing) {
      return {
        success: false,
        error: new ApplicationError(
          "CONFLICT",
          "A reconciliation already exists for this business date.",
        ),
      };
    }

    return success(
      await this.reconciliationRepository.create({
        businessId,
        businessDate,
        totalSales: 0,
        cashTotal: 0,
        upiTotal: 0,
        cardTotal: 0,
        otherTotal: 0,
        expectedCash: 0,
        actualCash: input.actualCash,
        cashDifference: input.actualCash,
        status: "closed",
        closedBy: input.closedBy?.trim() || null,
      }),
    );
  }
}