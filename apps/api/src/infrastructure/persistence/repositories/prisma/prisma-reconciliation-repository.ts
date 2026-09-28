import { Injectable } from "@nestjs/common";
import type {
  CreateReconciliationRecord,
  ReconciliationRecord,
  ReconciliationRepository,
} from "../../../../application";
import { PrismaClientService } from "../../prisma";

@Injectable()
export class PrismaReconciliationRepository
  implements ReconciliationRepository
{
  constructor(
    private readonly prisma: PrismaClientService,
  ) {}

  async findByBusinessDate(
    businessId: string,
    businessDate: Date,
  ): Promise<ReconciliationRecord | null> {
    const reconciliation =
      await this.prisma.reconciliation.findUnique({
        where: {
          businessId_businessDate: {
            businessId,
            businessDate,
          },
        },
      });

    if (!reconciliation) {
      return null;
    }

    return this.mapRecord(reconciliation);
  }

  async create(
    input: CreateReconciliationRecord,
  ): Promise<ReconciliationRecord> {
    const dayStart = input.businessDate;
    const dayEnd = new Date(dayStart);
    dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);

    const sales = await this.prisma.sale.findMany({
      where: {
        businessId: input.businessId,
        status: "completed",
        createdAt: {
          gte: dayStart,
          lt: dayEnd,
        },
      },
      select: {
        total: true,
      },
    });

    const payments = await this.prisma.payment.findMany({
      where: {
        businessId: input.businessId,
        status: "successful",
        sale: {
          businessId: input.businessId,
          status: "completed",
          createdAt: {
            gte: dayStart,
            lt: dayEnd,
          },
        },
      },
      select: {
        amount: true,
        method: true,
      },
    });

    let cashTotal = 0;
    let upiTotal = 0;
    let cardTotal = 0;
    let otherTotal = 0;

    for (const payment of payments) {
      const amount = Number(payment.amount);
      const method = payment.method.trim().toLowerCase();

      if (method === "cash") {
        cashTotal += amount;
      } else if (method === "upi") {
        upiTotal += amount;
      } else if (method === "card") {
        cardTotal += amount;
      } else {
        otherTotal += amount;
      }
    }

    const totalSales = sales.reduce(
      (sum, sale) => sum + Number(sale.total),
      0,
    );

    const expectedCash = cashTotal;
    const cashDifference = input.actualCash - expectedCash;

    const reconciliation =
      await this.prisma.reconciliation.create({
        data: {
          businessId: input.businessId,
          businessDate: input.businessDate,
          totalSales,
          cashTotal,
          upiTotal,
          cardTotal,
          otherTotal,
          expectedCash,
          actualCash: input.actualCash,
          cashDifference,
          status: "closed",
          closedBy: input.closedBy,
        },
      });

    return this.mapRecord(reconciliation);
  }

  private mapRecord(
    reconciliation: {
      id: string;
      businessId: string;
      businessDate: Date;
      totalSales: unknown;
      cashTotal: unknown;
      upiTotal: unknown;
      cardTotal: unknown;
      otherTotal: unknown;
      expectedCash: unknown;
      actualCash: unknown;
      cashDifference: unknown;
      status: string;
      closedBy: string | null;
      closedAt: Date;
      createdAt: Date;
      updatedAt: Date;
    },
  ): ReconciliationRecord {
    return {
      id: reconciliation.id,
      businessId: reconciliation.businessId,
      businessDate: reconciliation.businessDate,
      totalSales: Number(reconciliation.totalSales),
      cashTotal: Number(reconciliation.cashTotal),
      upiTotal: Number(reconciliation.upiTotal),
      cardTotal: Number(reconciliation.cardTotal),
      otherTotal: Number(reconciliation.otherTotal),
      expectedCash: Number(reconciliation.expectedCash),
      actualCash: Number(reconciliation.actualCash),
      cashDifference: Number(reconciliation.cashDifference),
      status: reconciliation.status,
      closedBy: reconciliation.closedBy,
      closedAt: reconciliation.closedAt,
      createdAt: reconciliation.createdAt,
      updatedAt: reconciliation.updatedAt,
    };
  }
}