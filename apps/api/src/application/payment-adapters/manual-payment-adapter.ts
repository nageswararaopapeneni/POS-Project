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
      provider: request.provider ?? null,
      externalReference: request.externalReference ?? null,
      reference: request.reference ?? null,
    };
  }
}