import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth";
import { BusinessModule } from "./modules/business";
import { HealthModule } from "./modules/health";

@Module({
  imports: [
    HealthModule,
    BusinessModule,
    AuthModule,
  ],
})
export class AppModule {}