import { Injectable } from "@nestjs/common";
import type {
  CreateSaleRecord,
  SaleRecord,
  SaleRepository,
} from "../../../../application";
import { PrismaClientService } from "../../prisma";
import { decimalToNumber } from "../../prisma";

function mapSale(
  sale: {
    id: string;
    businessId: string;
    branchId: string | null;
    status: string;
    subtotal: unknown;
    discount: unknown;
    total: unknown;
    createdAt: Date;
    updatedAt: Date;
    items: readonly {
      productId: string;
      quantity: unknown;
      unitPrice: unknown;
      lineTotal: unknown;
      product: {
        name: string;
      };
    }[];
  },
): SaleRecord {
  return {
    id: sale.id,
    businessId: sale.businessId,
    branchId: sale.branchId,
    status: sale.status,
    subtotal: decimalToNumber(sale.subtotal),
    discount: decimalToNumber(sale.discount),
    total: decimalToNumber(sale.total),
    items: sale.items.map((item) => ({
      productId: item.productId,
      productName: item.product.name,
      quantity: decimalToNumber(item.quantity),
      unitPrice: decimalToNumber(item.unitPrice),
      lineTotal: decimalToNumber(item.lineTotal),
    })),
    createdAt: sale.createdAt,
    updatedAt: sale.updatedAt,
  };
}

@Injectable()
export class PrismaSaleRepository implements SaleRepository {
  constructor(
    private readonly prisma: PrismaClientService,
  ) {}

  async create(
    sale: CreateSaleRecord,
  ): Promise<SaleRecord> {
    const created = await this.prisma.sale.create({
      data: {
        businessId: sale.businessId,
        branchId: sale.branchId,
        status: "completed",
        subtotal: sale.subtotal,
        discount: sale.discount,
        total: sale.total,
        items: {
          create: sale.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            lineTotal: item.lineTotal,
          })),
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

    return mapSale(created);
  }

  async findById(
    businessId: string,
    saleId: string,
  ): Promise<SaleRecord | null> {
    const sale = await this.prisma.sale.findFirst({
      where: {
        id: saleId,
        businessId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!sale) {
      return null;
    }

    return mapSale(sale);
  }

  async findMany(
    businessId: string,
    limit: number,
    offset: number,
  ): Promise<readonly SaleRecord[]> {
    const sales = await this.prisma.sale.findMany({
      where: {
        businessId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: limit,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return sales.map(mapSale);
  }
}