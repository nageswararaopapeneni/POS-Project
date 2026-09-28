import type {
  PaymentAdapter,
  PaymentAdapterRequest,
  PaymentAdapterResult,
} from "./payment-adapter";

export class CardPaymentAdapter implements PaymentAdapter {
  readonly name = "card";

  supports(method: PaymentAdapterRequest["method"]): boolean {
    return method === "card";
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