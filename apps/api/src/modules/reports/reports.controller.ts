import {
  Controller,
  Get,
  Query,
} from "@nestjs/common";
import {
  GetBasicReportsUseCase,
  type BasicReportsOutput,
} from "../../application";
import { GetBasicReportsDto } from "./dto/get-basic-reports.dto";

@Controller("reports")
export class ReportsController {
  constructor(
    private readonly getBasicReports: GetBasicReportsUseCase,
  ) {}

  @Get("basic")
  async getBasicReportsData(
    @Query() query: GetBasicReportsDto,
  ): Promise<BasicReportsOutput> {
    const result = await this.getBasicReports.execute({
      businessId: query.businessId,
      from: query.from,
      to: query.to,
    });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }
}