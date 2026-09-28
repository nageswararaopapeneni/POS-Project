import type {
  PaymentAdapter,
  PaymentAdapterRequest,
  PaymentAdapterResult,
} from "./payment-adapter";

export class CashPaymentAdapter implements PaymentAdapter {
  readonly name = "cash";

  supports(method: PaymentAdapterRequest["method"]): boolean {
    return method === "cash";
  }

  async process(
    request: PaymentAdapterRequest,
  ): Promise<PaymentAdapterResult> {
    return {
      status: "successful",
      reference: request.reference ?? null,
    };
  }
}