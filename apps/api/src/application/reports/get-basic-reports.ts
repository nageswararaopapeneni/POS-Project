import { ApplicationError } from "../common/application-error";
import {
  type ApplicationResult,
  success,
} from "../common/application-result";
import type { GetBasicReportsInput } from "./report-input";
import type { BasicReportsOutput } from "./report-output";
import type { ReportRepository } from "./report-repository";

export class GetBasicReportsUseCase {
  constructor(
    private readonly reportRepository: ReportRepository,
  ) {}

  async execute(
    input: GetBasicReportsInput,
  ): Promise<ApplicationResult<BasicReportsOutput>> {
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

    const now = new Date();

    const from = input.from
      ? new Date(input.from)
      : new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
          ),
        );

    const to = input.to
      ? new Date(input.to)
      : new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1,
          ),
        );

    if (Number.isNaN(from.getTime())) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Invalid from date.",
        ),
      };
    }

    if (Number.isNaN(to.getTime())) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Invalid to date.",
        ),
      };
    }

    if (from >= to) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "The from date must be before the to date.",
        ),
      };
    }

    const reports = await this.reportRepository.getBasicReports(
      businessId,
      from,
      to,
    );

    return success(reports);
  }
}