import {
  Controller,
  Get,
  Query,
} from "@nestjs/common";
import { GetSalesUseCase } from "../../application";

@Controller("sales-history")
export class SalesHistoryController {
  constructor(
    private readonly getSalesUseCase: GetSalesUseCase,
  ) {}

  @Get()
  async getSales(
    @Query("businessId") businessId: string,
    @Query("limit") limit?: string,
    @Query("offset") offset?: string,
  ) {
    const result = await this.getSalesUseCase.execute({
      businessId,
      limit: limit === undefined ? undefined : Number(limit),
      offset: offset === undefined ? undefined : Number(offset),
    });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }
}