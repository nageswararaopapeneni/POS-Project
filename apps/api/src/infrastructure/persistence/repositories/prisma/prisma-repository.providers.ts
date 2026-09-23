import type { Provider } from "@nestjs/common";
import {
  BusinessRepository,
  PaymentRepository,
  ProductRepository,
  ReceiptRepository,
  SaleRepository,
} from "../../../../application";
import { PrismaPaymentRepository } from "./prisma-payment-repository";
import { PrismaProductRepository } from "./prisma-product-repository";
import { PrismaSaleRepository } from "./prisma-sale-repository";
import { PrismaBusinessRepository } from "./prisma-business-repository";
import { PrismaReceiptRepository } from "./prisma-receipt-repository";
import { REPOSITORY_TOKENS } from "./prisma-repository.tokens";

export const prismaRepositoryProviders: Provider[] = [
  {
    provide: REPOSITORY_TOKENS.business,
    useClass: PrismaBusinessRepository,
  },
  {
    provide: REPOSITORY_TOKENS.product,
    useClass: PrismaProductRepository,
  },
  {
    provide: REPOSITORY_TOKENS.sale,
    useClass: PrismaSaleRepository,
  },
  {
    provide: REPOSITORY_TOKENS.payment,
    useClass: PrismaPaymentRepository,
  },
  {
    provide: REPOSITORY_TOKENS.receipt,
    useClass: PrismaReceiptRepository,
  },
];

export const repositoryExports = [
  REPOSITORY_TOKENS.business,
  REPOSITORY_TOKENS.product,
  REPOSITORY_TOKENS.sale,
  REPOSITORY_TOKENS.payment,
  REPOSITORY_TOKENS.receipt,
];

export type RepositoryProviderContracts = {
  business: BusinessRepository;
  product: ProductRepository;
  sale: SaleRepository;
  payment: PaymentRepository;
  receipt: ReceiptRepository;
};