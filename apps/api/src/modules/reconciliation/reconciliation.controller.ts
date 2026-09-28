import {
  Body,
  Controller,
  Get,
  Post,
  Query,
} from "@nestjs/common";
import {
  CreateReconciliationUseCase,
  GetReconciliationUseCase,
  type ReconciliationRecord,
} from "../../application";
import { CreateReconciliationDto } from "./dto/create-reconciliation.dto";
import { GetReconciliationDto } from "./dto/get-reconciliation.dto";

@Controller("reconciliations")
export class ReconciliationController {
  constructor(
    private readonly createReconciliation: CreateReconciliationUseCase,
    private readonly getReconciliation: GetReconciliationUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreateReconciliationDto,
  ): Promise<ReconciliationRecord> {
    const result = await this.createReconciliation.execute({
      businessId: body.businessId,
      businessDate: body.businessDate,
      actualCash: body.actualCash,
      closedBy: body.closedBy,
    });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  @Get()
  async get(
    @Query() query: GetReconciliationDto,
  ): Promise<ReconciliationRecord> {
    const result = await this.getReconciliation.execute({
      businessId: query.businessId,
      businessDate: query.businessDate,
    });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }
}