import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth";
import { BusinessModule } from "./modules/business";
import { HealthModule } from "./modules/health";
import { ProductModule } from "./modules/product";
import { SaleModule } from "./modules/sale";

@Module({
  imports: [
    HealthModule,
    BusinessModule,
    AuthModule,
    ProductModule,
    SaleModule,
  ],
})
export class AppModule {}