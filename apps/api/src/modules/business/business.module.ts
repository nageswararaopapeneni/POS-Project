import { Module } from "@nestjs/common";
import {
  CreateBusinessUseCase,
  GetBusinessUseCase,
} from "../../application";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { BusinessController } from "./business.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [BusinessController],
  providers: [
    {
      provide: CreateBusinessUseCase,
      useFactory: (businessRepository: any) =>
        new CreateBusinessUseCase(businessRepository),
      inject: [REPOSITORY_TOKENS.business],
    },
    {
      provide: GetBusinessUseCase,
      useFactory: (businessRepository: any) =>
        new GetBusinessUseCase(businessRepository),
      inject: [REPOSITORY_TOKENS.business],
    },
  ],
  exports: [CreateBusinessUseCase, GetBusinessUseCase],
})
export class BusinessModule {}