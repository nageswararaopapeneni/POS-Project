import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma";
import {
  prismaRepositoryProviders,
  repositoryExports,
} from "./prisma-repository.providers";

@Module({
  imports: [PrismaModule],
  providers: prismaRepositoryProviders,
  exports: repositoryExports,
})
export class PrismaRepositoryModule {}