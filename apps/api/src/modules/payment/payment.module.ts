import { Module } from "@nestjs/common";
import {
  CreatePaymentUseCase,
  GetPaymentUseCase,
  GetPaymentsBySaleUseCase,
  PaymentRepository,
  SaleRepository,
  UpdatePaymentStatusUseCase,
} from "../../application";
import { PaymentAdapterRegistry } from "../../application/payment-adapters";
import {
  CardPaymentAdapter,
  CashPaymentAdapter,
  ManualPaymentAdapter,
  UpiPaymentAdapter,
} from "../../application/payment-adapters";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { PaymentController } from "./payment.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [PaymentController],
  providers: [
    CashPaymentAdapter,
    UpiPaymentAdapter,
    CardPaymentAdapter,
    ManualPaymentAdapter,
    {
      provide: PaymentAdapterRegistry,
      useFactory: (
        cash: CashPaymentAdapter,
        upi: UpiPaymentAdapter,
        card: CardPaymentAdapter,
        manual: ManualPaymentAdapter,
      ) =>
        new PaymentAdapterRegistry([
          cash,
          upi,
          card,
          manual,
        ]),
      inject: [
        CashPaymentAdapter,
        UpiPaymentAdapter,
        CardPaymentAdapter,
        ManualPaymentAdapter,
      ],
    },
    {
      provide: CreatePaymentUseCase,
      useFactory: (
        saleRepository: SaleRepository,
        paymentRepository: PaymentRepository,
        registry: PaymentAdapterRegistry,
      ) =>
        new CreatePaymentUseCase(
          saleRepository,
          paymentRepository,
          registry,
        ),
      inject: [
        REPOSITORY_TOKENS.sale,
        REPOSITORY_TOKENS.payment,
        PaymentAdapterRegistry,
      ],
    },
    {
      provide: GetPaymentUseCase,
      useFactory: (
        paymentRepository: PaymentRepository,
      ) =>
        new GetPaymentUseCase(
          paymentRepository,
        ),
      inject: [REPOSITORY_TOKENS.payment],
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
    {
      provide: UpdatePaymentStatusUseCase,
      useFactory: (
        paymentRepository: PaymentRepository,
      ) =>
        new UpdatePaymentStatusUseCase(
          paymentRepository,
        ),
      inject: [REPOSITORY_TOKENS.payment],
    },
  ],
  exports: [
    CreatePaymentUseCase,
    GetPaymentUseCase,
    GetPaymentsBySaleUseCase,
    UpdatePaymentStatusUseCase,
  ],
})
export class PaymentModule {}