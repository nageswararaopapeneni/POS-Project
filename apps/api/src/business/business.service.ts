import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateBusinessDto } from "./dto";

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBusinessDto) {
    return this.prisma.business.create({
      data: {
        name: dto.name,
        contact: dto.contact,
        address: dto.address,
        currency: dto.currency,
        taxConfiguration: dto.taxConfiguration,
        settings: dto.settings,
      },
    });
  }

  async findById(id: string) {
    const business = await this.prisma.business.findUnique({
      where: { id },
    });

    if (!business) {
      throw new NotFoundException("Business not found");
    }

    return business;
  }
}