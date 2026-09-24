import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  CreatePaymentUseCase,
  GetPaymentsBySaleUseCase,
} from "../../application";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Controller("payments")
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly getPaymentsBySaleUseCase:
      GetPaymentsBySaleUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreatePaymentDto,
  ) {
    const result =
      await this.createPaymentUseCase.execute({
        businessId: body.businessId,
        saleId: body.saleId,
        amount: body.amount,
        method: body.method,
        reference: body.reference,
      });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  @Get("sale/:saleId")
  async getBySale(
    @Param("saleId") saleId: string,
    @Query("businessId") businessId: string,
  ) {
    const result =
      await this.getPaymentsBySaleUseCase.execute({
        businessId,
        saleId,
      });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }
}