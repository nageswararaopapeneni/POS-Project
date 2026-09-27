import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  GenerateReceiptUseCase,
  GetReceiptUseCase,
} from "../../application";
import { GenerateReceiptDto } from "./dto/generate-receipt.dto";

@Controller("receipts")
export class ReceiptController {
  constructor(
    private readonly generateReceiptUseCase:
      GenerateReceiptUseCase,
    private readonly getReceiptUseCase:
      GetReceiptUseCase,
  ) {}

  @Post()
  async generate(
    @Body() body: GenerateReceiptDto,
  ) {
    const result =
      await this.generateReceiptUseCase.execute({
        businessId: body.businessId,
        saleId: body.saleId,
      });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  @Get(":receiptId")
  async get(
    @Param("receiptId") receiptId: string,
    @Query("businessId") businessId: string,
  ) {
    const result =
      await this.getReceiptUseCase.execute({
        businessId,
        receiptId,
      });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }
}