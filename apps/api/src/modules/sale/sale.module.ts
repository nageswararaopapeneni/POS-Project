import { Module } from "@nestjs/common";
import {
  CreateSaleUseCase,
  GetSaleUseCase,
  type ProductRepository,
  type SaleRepository,
} from "../../application";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { SaleController } from "./sale.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [SaleController],
  providers: [
    {
      provide: CreateSaleUseCase,
      useFactory: (
        productRepository: ProductRepository,
        saleRepository: SaleRepository,
      ) =>
        new CreateSaleUseCase(
          productRepository,
          saleRepository,
        ),
      inject: [
        REPOSITORY_TOKENS.product,
        REPOSITORY_TOKENS.sale,
      ],
    },
    {
      provide: GetSaleUseCase,
      useFactory: (
        saleRepository: SaleRepository,
      ) => new GetSaleUseCase(saleRepository),
      inject: [REPOSITORY_TOKENS.sale],
    },
  ],
  exports: [
    CreateSaleUseCase,
    GetSaleUseCase,
  ],
})
export class SaleModule {}