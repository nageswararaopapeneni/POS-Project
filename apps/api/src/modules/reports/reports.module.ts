import { Module } from "@nestjs/common";
import { GetBasicReportsUseCase } from "../../application";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { ReportsController } from "./reports.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [ReportsController],
  providers: [
    {
      provide: GetBasicReportsUseCase,
      useFactory: (reportRepository: unknown) =>
        new GetBasicReportsUseCase(
          reportRepository as ConstructorParameters<
            typeof GetBasicReportsUseCase
          >[0],
        ),
      inject: [REPOSITORY_TOKENS.report],
    },
  ],
})
export class ReportsModule {}