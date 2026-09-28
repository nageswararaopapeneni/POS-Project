import { Module } from "@nestjs/common";
import {
  CardPaymentAdapter,
  CashPaymentAdapter,
  CreatePaymentUseCase,
  GetPaymentsBySaleUseCase,
  ManualPaymentAdapter,
  PaymentAdapterRegistry,
  type PaymentRepository,
  type SaleRepository,
  UpiPaymentAdapter,
} from "../../application";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { PaymentController } from "./payment.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [PaymentController],
  providers: [
    {
      provide: PaymentAdapterRegistry,
      useFactory: () =>
        new PaymentAdapterRegistry([
          new CashPaymentAdapter(),
          new UpiPaymentAdapter(),
          new CardPaymentAdapter(),
          new ManualPaymentAdapter(),
        ]),
    },
    {
      provide: CreatePaymentUseCase,
      useFactory: (
        saleRepository: SaleRepository,
        paymentRepository: PaymentRepository,
        paymentAdapterRegistry: PaymentAdapterRegistry,
      ) =>
        new CreatePaymentUseCase(
          saleRepository,
          paymentRepository,
          paymentAdapterRegistry,
        ),
      inject: [
        REPOSITORY_TOKENS.sale,
        REPOSITORY_TOKENS.payment,
        PaymentAdapterRegistry,
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