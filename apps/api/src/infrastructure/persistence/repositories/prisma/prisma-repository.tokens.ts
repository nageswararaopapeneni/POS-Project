export const REPOSITORY_TOKENS = {
  business: Symbol("BusinessRepository"),
  product: Symbol("ProductRepository"),
  sale: Symbol("SaleRepository"),
  payment: Symbol("PaymentRepository"),
  receipt: Symbol("ReceiptRepository"),
  user: Symbol("UserRepository"),
  report: Symbol("ReportRepository"),
  reconciliation: Symbol("ReconciliationRepository"),
  cashDrawer: Symbol("CashDrawerRepository"),
} as const;