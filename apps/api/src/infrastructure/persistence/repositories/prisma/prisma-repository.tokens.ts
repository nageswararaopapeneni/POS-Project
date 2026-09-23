export const REPOSITORY_TOKENS = {
  business: Symbol("BusinessRepository"),
  product: Symbol("ProductRepository"),
  sale: Symbol("SaleRepository"),
  payment: Symbol("PaymentRepository"),
  receipt: Symbol("ReceiptRepository"),
} as const;