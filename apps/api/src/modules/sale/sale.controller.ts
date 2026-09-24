import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  CreateSaleUseCase,
  GetSaleUseCase,
} from "../../application";
import { CreateSaleDto } from "./dto/create-sale.dto";

@Controller("sales")
export class SaleController {
  constructor(
    private readonly createSaleUseCase: CreateSaleUseCase,
    private readonly getSaleUseCase: GetSaleUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreateSaleDto,
  ) {
    const result = await this.createSaleUseCase.execute({
      businessId: body.businessId,
      branchId: body.branchId,
      discount: body.discount,
      items: body.items,
    });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  @Get(":saleId")
  async get(
    @Param("saleId") saleId: string,
    @Query("businessId") businessId: string,
  ) {
    const result = await this.getSaleUseCase.execute({
      businessId,
      saleId,
    });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }
}