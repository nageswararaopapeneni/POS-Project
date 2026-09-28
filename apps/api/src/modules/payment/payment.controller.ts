import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  CreatePaymentUseCase,
  GetPaymentsBySaleUseCase,
  GetPaymentUseCase,
  UpdatePaymentStatusUseCase,
} from "../../application";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentStatusDto } from "./dto/update-payment-status.dto";

@Controller("payments")
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly getPaymentUseCase: GetPaymentUseCase,
    private readonly getPaymentsBySaleUseCase:
      GetPaymentsBySaleUseCase,
    private readonly updatePaymentStatusUseCase:
      UpdatePaymentStatusUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreatePaymentDto,
    @Headers("idempotency-key") idempotencyKey?: string,
  ) {
    const result = await this.createPaymentUseCase.execute({
      businessId: body.businessId,
      saleId: body.saleId,
      amount: body.amount,
      method: body.method,
      provider: body.provider,
      externalReference: body.externalReference,
      reference: body.reference,
      idempotencyKey:
        body.idempotencyKey?.trim() ||
        idempotencyKey?.trim() ||
        null,
    });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  @Get(":paymentId")
  async get(
    @Param("paymentId") paymentId: string,
    @Query("businessId") businessId: string,
  ) {
    const result = await this.getPaymentUseCase.execute({
      businessId,
      paymentId,
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

  @Patch(":paymentId/status")
  async updateStatus(
    @Param("paymentId") paymentId: string,
    @Query("businessId") businessId: string,
    @Body() body: UpdatePaymentStatusDto,
  ) {
    const result =
      await this.updatePaymentStatusUseCase.execute({
        businessId,
        paymentId,
        status: body.status,
      });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }
}