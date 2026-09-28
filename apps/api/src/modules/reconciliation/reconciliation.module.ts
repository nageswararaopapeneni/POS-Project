import { Module } from "@nestjs/common";
import {
  CreateReconciliationUseCase,
  GetReconciliationUseCase,
} from "../../application";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { ReconciliationController } from "./reconciliation.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [ReconciliationController],
  providers: [
    {
      provide: CreateReconciliationUseCase,
      useFactory: (repository: unknown) =>
        new CreateReconciliationUseCase(
          repository as ConstructorParameters<
            typeof CreateReconciliationUseCase
          >[0],
        ),
      inject: [REPOSITORY_TOKENS.reconciliation],
    },
    {
      provide: GetReconciliationUseCase,
      useFactory: (repository: unknown) =>
        new GetReconciliationUseCase(
          repository as ConstructorParameters<
            typeof GetReconciliationUseCase
          >[0],
        ),
      inject: [REPOSITORY_TOKENS.reconciliation],
    },
  ],
})
export class ReconciliationModule {}