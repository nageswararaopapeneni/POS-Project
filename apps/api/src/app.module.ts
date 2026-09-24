import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth";
import { BusinessModule } from "./modules/business";
import { HealthModule } from "./modules/health";
import { PaymentModule } from "./modules/payment";
import { ProductModule } from "./modules/product";
import { SaleModule } from "./modules/sale";

@Module({
  imports: [
    HealthModule,
    BusinessModule,
    AuthModule,
    ProductModule,
    SaleModule,
    PaymentModule,
  ],
})
export class AppModule {}