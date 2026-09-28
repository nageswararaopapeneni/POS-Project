import { Module } from "@nestjs/common";
import {
  GetCashDrawerEventsUseCase,
  RecordCashDrawerEventUseCase,
} from "../../application";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { CashDrawerController } from "./cash-drawer.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [CashDrawerController],
  providers: [
    {
      provide: RecordCashDrawerEventUseCase,
      useFactory: (repository: unknown) =>
        new RecordCashDrawerEventUseCase(
          repository as ConstructorParameters<
            typeof RecordCashDrawerEventUseCase
          >[0],
        ),
      inject: [REPOSITORY_TOKENS.cashDrawer],
    },
    {
      provide: GetCashDrawerEventsUseCase,
      useFactory: (repository: unknown) =>
        new GetCashDrawerEventsUseCase(
          repository as ConstructorParameters<
            typeof GetCashDrawerEventsUseCase
          >[0],
        ),
      inject: [REPOSITORY_TOKENS.cashDrawer],
    },
  ],
})
export class CashDrawerModule {}