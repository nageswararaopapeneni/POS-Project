import { Injectable } from "@nestjs/common";
import type {
  ProductRecord,
  ProductRepository,
} from "../../../../application";
import { PrismaClientService } from "../../prisma";
import { decimalToNumber } from "../../prisma";

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async create(product: ProductRecord): Promise<ProductRecord> {
    const created = await this.prisma.product.create({
      data: {
        id: product.id,
        businessId: product.businessId,
        name: product.name,
        sku: product.sku,
        barcode: product.barcode,
        price: product.price,
        active: product.active,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });

    return {
      id: created.id,
      businessId: created.businessId,
      name: created.name,
      sku: created.sku,
      barcode: created.barcode,
      price: decimalToNumber(created.price),
      active: created.active,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }

  async findById(id: string): Promise<ProductRecord | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      businessId: product.businessId,
      name: product.name,
      sku: product.sku,
      barcode: product.barcode,
      price: decimalToNumber(product.price),
      active: product.active,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  async findByBarcode(
    businessId: string,
    barcode: string,
  ): Promise<ProductRecord | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        businessId,
        barcode,
      },
    });

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      businessId: product.businessId,
      name: product.name,
      sku: product.sku,
      barcode: product.barcode,
      price: decimalToNumber(product.price),
      active: product.active,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  async findBySku(
    businessId: string,
    sku: string,
  ): Promise<ProductRecord | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        businessId,
        sku,
      },
    });

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      businessId: product.businessId,
      name: product.name,
      sku: product.sku,
      barcode: product.barcode,
      price: decimalToNumber(product.price),
      active: product.active,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}