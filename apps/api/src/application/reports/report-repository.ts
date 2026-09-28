import type {
  BasicReportsOutput,
} from "./report-output";

export interface ReportRepository {
  getBasicReports(
    businessId: string,
    from: Date,
    to: Date,
  ): Promise<BasicReportsOutput>;
}