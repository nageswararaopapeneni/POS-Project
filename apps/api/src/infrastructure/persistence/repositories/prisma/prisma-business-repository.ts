import { Injectable } from "@nestjs/common";
import type {
  BusinessRecord,
  BusinessRepository,
} from "../../../../application";
import { PrismaClientService } from "../../prisma";

@Injectable()
export class PrismaBusinessRepository implements BusinessRepository {
  constructor(private readonly prisma: PrismaClientService) {}

  async create(business: BusinessRecord): Promise<BusinessRecord> {
    return this.prisma.business.create({
      data: {
        id: business.id,
        name: business.name,
        createdAt: business.createdAt,
        updatedAt: business.updatedAt,
      },
    });
  }

  async findById(id: string): Promise<BusinessRecord | null> {
    return this.prisma.business.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<BusinessRecord | null> {
    return this.prisma.business.findFirst({
      where: { name },
    });
  }
}