import { ApplicationError } from "../common/application-error";
import {
  type ApplicationResult,
  success,
} from "../common/application-result";
import type { GetReconciliationInput } from "./reconciliation-input";
import type {
  ReconciliationRecord,
  ReconciliationRepository,
} from "./reconciliation-output";

export class GetReconciliationUseCase {
  constructor(
    private readonly reconciliationRepository: ReconciliationRepository,
  ) {}

  async execute(
    input: GetReconciliationInput,
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

    const reconciliation =
      await this.reconciliationRepository.findByBusinessDate(
        businessId,
        businessDate,
      );

    if (!reconciliation) {
      return {
        success: false,
        error: new ApplicationError(
          "NOT_FOUND",
          "Reconciliation was not found.",
        ),
      };
    }

    return success(reconciliation);
  }
}