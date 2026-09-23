import { Injectable } from "@nestjs/common";
import type {
  SaleRecord,
  SaleRepository,
} from "../../../../application";
import { PrismaClientService } from "../../prisma";
import { decimalToNumber } from "../../prisma";

@Injectable()
export class PrismaSaleRepository implements SaleRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async create(sale: SaleRecord): Promise<SaleRecord> {
    const created = await this.prisma.sale.create({
      data: {
        id: sale.id,
        businessId: sale.businessId,
        branchId: sale.branchId,
        status: sale.status,
        subtotal: sale.subtotal,
        discount: sale.discount,
        total: sale.total,
        createdAt: sale.createdAt,
        updatedAt: sale.updatedAt,
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

    return {
      id: created.id,
      businessId: created.businessId,
      branchId: created.branchId,
      status: created.status,
      subtotal: decimalToNumber(created.subtotal),
      discount: decimalToNumber(created.discount),
      total: decimalToNumber(created.total),
      items: created.items.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        quantity: decimalToNumber(item.quantity),
        unitPrice: decimalToNumber(item.unitPrice),
        lineTotal: decimalToNumber(item.lineTotal),
      })),
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }

  async findById(id: string): Promise<SaleRecord | null> {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
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
}