import { Injectable } from "@nestjs/common";
import type {
  BasicReportsOutput,
  ReportRepository,
} from "../../../../application";
import { PrismaClientService } from "../../prisma";

@Injectable()
export class PrismaReportRepository implements ReportRepository {
  constructor(
    private readonly prisma: PrismaClientService,
  ) {}

  async getBasicReports(
    businessId: string,
    from: Date,
    to: Date,
  ): Promise<BasicReportsOutput> {
    const sales = await this.prisma.sale.findMany({
      where: {
        businessId,
        status: "completed",
        createdAt: {
          gte: from,
          lt: to,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    const payments = await this.prisma.payment.findMany({
      where: {
        businessId,
        status: "successful",
        sale: {
          businessId,
          status: "completed",
          createdAt: {
            gte: from,
            lt: to,
          },
        },
      },
      select: {
        method: true,
        amount: true,
      },
    });

    const subtotal = sales.reduce(
      (total, sale) => total + Number(sale.subtotal),
      0,
    );

    const discount = sales.reduce(
      (total, sale) => total + Number(sale.discount),
      0,
    );

    const total = sales.reduce(
      (sum, sale) => sum + Number(sale.total),
      0,
    );

    const productMap = new Map<
      string,
      {
        productId: string;
        productName: string;
        quantity: number;
        total: number;
      }
    >();

    for (const sale of sales) {
      for (const item of sale.items) {
        const existing = productMap.get(item.productId);

        if (existing) {
          existing.quantity += Number(item.quantity);
          existing.total += Number(item.lineTotal);
          continue;
        }

        productMap.set(item.productId, {
          productId: item.productId,
          productName: item.product.name,
          quantity: Number(item.quantity),
          total: Number(item.lineTotal),
        });
      }
    }

    const paymentMap = new Map<
      string,
      {
        method: string;
        count: number;
        total: number;
      }
    >();

    for (const payment of payments) {
      const existing = paymentMap.get(payment.method);

      if (existing) {
        existing.count += 1;
        existing.total += Number(payment.amount);
        continue;
      }

      paymentMap.set(payment.method, {
        method: payment.method,
        count: 1,
        total: Number(payment.amount),
      });
    }

    return {
      period: {
        from,
        to,
      },
      sales: {
        count: sales.length,
        subtotal,
        discount,
        total,
      },
      products: Array.from(productMap.values()).sort(
        (a, b) => b.total - a.total,
      ),
      payments: Array.from(paymentMap.values()).sort(
        (a, b) => b.total - a.total,
      ),
    };
  }
}