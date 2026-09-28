import { Injectable } from "@nestjs/common";
import type {
  CashDrawerEventRecord,
  CashDrawerRepository,
  CreateCashDrawerEventRecord,
} from "../../../../application";
import { PrismaClientService } from "../../prisma";

@Injectable()
export class PrismaCashDrawerRepository implements CashDrawerRepository {
  constructor(
    private readonly prisma: PrismaClientService,
  ) {}

  async create(
    input: CreateCashDrawerEventRecord,
  ): Promise<CashDrawerEventRecord> {
    const event = await this.prisma.cashDrawerEvent.create({
      data: {
        businessId: input.businessId,
        branchId: input.branchId,
        deviceId: input.deviceId,
        userId: input.userId,
        eventType: input.eventType,
        reason: input.reason,
        saleId: input.saleId,
        exceptionStatus: input.exceptionStatus,
        openedAt: input.openedAt,
        closedAt: input.closedAt,
      },
    });

    return this.mapRecord(event);
  }

  async findMany(
    businessId: string,
    filters: {
      readonly from?: Date;
      readonly to?: Date;
      readonly saleId?: string;
      readonly exceptionStatus?: "none" | "exception";
    },
  ): Promise<readonly CashDrawerEventRecord[]> {
    const events = await this.prisma.cashDrawerEvent.findMany({
      where: {
        businessId,
        ...(filters.from || filters.to
          ? {
              createdAt: {
                ...(filters.from ? { gte: filters.from } : {}),
                ...(filters.to ? { lt: filters.to } : {}),
              },
            }
          : {}),
        ...(filters.saleId ? { saleId: filters.saleId } : {}),
        ...(filters.exceptionStatus
          ? { exceptionStatus: filters.exceptionStatus }
          : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return events.map((event) => this.mapRecord(event));
  }

  private mapRecord(
    event: {
      id: string;
      businessId: string;
      branchId: string | null;
      deviceId: string | null;
      userId: string | null;
      eventType: string;
      reason: string;
      saleId: string | null;
      exceptionStatus: string;
      openedAt: Date | null;
      closedAt: Date | null;
      createdAt: Date;
      updatedAt: Date;
    },
  ): CashDrawerEventRecord {
    return {
      id: event.id,
      businessId: event.businessId,
      branchId: event.branchId,
      deviceId: event.deviceId,
      userId: event.userId,
      eventType: event.eventType as "open" | "close",
      reason: event.reason,
      saleId: event.saleId,
      exceptionStatus:
        event.exceptionStatus === "exception" ? "exception" : "none",
      openedAt: event.openedAt,
      closedAt: event.closedAt,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }
}