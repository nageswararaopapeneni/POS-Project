import { Module } from "@nestjs/common";
import {
  CreatePaymentUseCase,
  GetPaymentsBySaleUseCase,
  type PaymentRepository,
  type SaleRepository,
} from "../../application";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { PaymentController } from "./payment.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [PaymentController],
  providers: [
    {
      provide: CreatePaymentUseCase,
      useFactory: (
        saleRepository: SaleRepository,
        paymentRepository: PaymentRepository,
      ) =>
        new CreatePaymentUseCase(
          saleRepository,
          paymentRepository,
        ),
      inject: [
        REPOSITORY_TOKENS.sale,
        REPOSITORY_TOKENS.payment,
      ],
    },
    {
      provide: GetPaymentsBySaleUseCase,
      useFactory: (
        paymentRepository: PaymentRepository,
      ) =>
        new GetPaymentsBySaleUseCase(
          paymentRepository,
        ),
      inject: [REPOSITORY_TOKENS.payment],
    },
  ],
  exports: [
    CreatePaymentUseCase,
    GetPaymentsBySaleUseCase,
  ],
})
export class PaymentModule {}