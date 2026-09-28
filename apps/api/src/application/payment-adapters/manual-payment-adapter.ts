import type {
  PaymentAdapter,
  PaymentAdapterRequest,
  PaymentAdapterResult,
} from "./payment-adapter";

export class ManualPaymentAdapter implements PaymentAdapter {
  readonly name = "manual";

  supports(method: PaymentAdapterRequest["method"]): boolean {
    return method === "other";
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