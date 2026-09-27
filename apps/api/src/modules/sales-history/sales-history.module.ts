import { Module } from "@nestjs/common";
import {
  GetSalesUseCase,
  type SaleRepository,
} from "../../application";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { SalesHistoryController } from "./sales-history.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [SalesHistoryController],
  providers: [
    {
      provide: GetSalesUseCase,
      useFactory: (
        saleRepository: SaleRepository,
      ) => new GetSalesUseCase(saleRepository),
      inject: [REPOSITORY_TOKENS.sale],
    },
  ],
  exports: [GetSalesUseCase],
})
export class SalesHistoryModule {}