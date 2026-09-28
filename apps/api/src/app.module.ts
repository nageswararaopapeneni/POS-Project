import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth";
import { BusinessModule } from "./modules/business";
import { HealthModule } from "./modules/health";
import { PaymentModule } from "./modules/payment";
import { ProductModule } from "./modules/product";
import { ReceiptModule } from "./modules/receipt";
import { ReconciliationModule } from "./modules/reconciliation";
import { ReportsModule } from "./modules/reports";
import { SaleModule } from "./modules/sale";
import { SalesHistoryModule } from "./modules/sales-history";
import { CashDrawerModule } from "./modules/cash-drawer";

@Module({
  imports: [
    HealthModule,
    BusinessModule,
    AuthModule,
    ProductModule,
    SaleModule,
    PaymentModule,
    ReceiptModule,
    SalesHistoryModule,
    ReportsModule,
    ReconciliationModule,
    CashDrawerModule,
  ],
})
export class AppModule {}