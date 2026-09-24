import { Module } from "@nestjs/common";
import {
  CreateProductUseCase,
  FindProductByBarcodeUseCase,
  GetProductUseCase,
  type ProductRepository,
} from "../../application";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { ProductController } from "./product.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [ProductController],
  providers: [
    {
      provide: CreateProductUseCase,
      useFactory: (repository: ProductRepository) =>
        new CreateProductUseCase(repository),
      inject: [REPOSITORY_TOKENS.product],
    },
    {
      provide: GetProductUseCase,
      useFactory: (repository: ProductRepository) =>
        new GetProductUseCase(repository),
      inject: [REPOSITORY_TOKENS.product],
    },
    {
      provide: FindProductByBarcodeUseCase,
      useFactory: (repository: ProductRepository) =>
        new FindProductByBarcodeUseCase(repository),
      inject: [REPOSITORY_TOKENS.product],
    },
  ],
  exports: [
    CreateProductUseCase,
    GetProductUseCase,
    FindProductByBarcodeUseCase,
  ],
})
export class ProductModule {}