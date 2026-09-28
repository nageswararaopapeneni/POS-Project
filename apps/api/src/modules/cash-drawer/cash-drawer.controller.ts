import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import {
  GetCashDrawerEventsUseCase,
  RecordCashDrawerEventUseCase,
  type CashDrawerEventRecord,
} from "../../application";
import { GetCashDrawerEventsDto } from "./dto/get-cash-drawer-events.dto";
import { RecordCashDrawerEventDto } from "./dto/record-cash-drawer-event.dto";

@Controller("cash-drawer")
export class CashDrawerController {
  constructor(
    private readonly recordCashDrawerEvent: RecordCashDrawerEventUseCase,
    private readonly getCashDrawerEvents: GetCashDrawerEventsUseCase,
  ) {}

  @Post("events")
  async recordEvent(
    @Body() body: RecordCashDrawerEventDto,
  ): Promise<CashDrawerEventRecord> {
    const result = await this.recordCashDrawerEvent.execute({
      businessId: body.businessId,
      branchId: body.branchId,
      deviceId: body.deviceId,
      userId: body.userId,
      eventType: body.eventType,
      reason: body.reason,
      saleId: body.saleId,
      exceptionStatus: body.exceptionStatus,
      openedAt: body.openedAt,
      closedAt: body.closedAt,
    });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  @Get("events")
  async getEvents(
    @Query() query: GetCashDrawerEventsDto,
  ): Promise<readonly CashDrawerEventRecord[]> {
    const result = await this.getCashDrawerEvents.execute({
      businessId: query.businessId,
      from: query.from,
      to: query.to,
      saleId: query.saleId,
      exceptionStatus: query.exceptionStatus,
    });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }
}