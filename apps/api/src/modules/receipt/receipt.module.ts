import { Module } from "@nestjs/common";
import {
  GenerateReceiptUseCase,
  GetReceiptUseCase,
  type ReceiptRepository,
  type SaleRepository,
} from "../../application";
import { PrismaReceiptNumberGenerator } from "../../infrastructure/persistence/repositories/prisma/prisma-receipt-number-generator";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { ReceiptController } from "./receipt.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [ReceiptController],
  providers: [
    PrismaReceiptNumberGenerator,
    {
      provide: GenerateReceiptUseCase,
      useFactory: (
        saleRepository: SaleRepository,
        receiptRepository: ReceiptRepository,
        receiptNumberGenerator: PrismaReceiptNumberGenerator,
      ) =>
        new GenerateReceiptUseCase(
          saleRepository,
          receiptRepository,
          receiptNumberGenerator,
        ),
      inject: [
        REPOSITORY_TOKENS.sale,
        REPOSITORY_TOKENS.receipt,
        PrismaReceiptNumberGenerator,
      ],
    },
    {
      provide: GetReceiptUseCase,
      useFactory: (
        receiptRepository: ReceiptRepository,
      ) =>
        new GetReceiptUseCase(receiptRepository),
      inject: [REPOSITORY_TOKENS.receipt],
    },
  ],
  exports: [
    GenerateReceiptUseCase,
    GetReceiptUseCase,
  ],
})
export class ReceiptModule {}