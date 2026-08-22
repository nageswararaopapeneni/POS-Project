import type { Prisma } from "../../generated/prisma/client";

export class CreateBusinessDto {
  name!: string;
  contact?: string;
  address?: string;
  currency!: string;
  taxConfiguration?: Prisma.InputJsonValue;
  settings?: Prisma.InputJsonValue;
}