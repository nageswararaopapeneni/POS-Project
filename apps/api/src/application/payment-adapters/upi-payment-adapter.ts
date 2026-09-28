import type {
  PaymentAdapter,
  PaymentAdapterRequest,
  PaymentAdapterResult,
} from "./payment-adapter";

export class UpiPaymentAdapter implements PaymentAdapter {
  readonly name = "upi";

  supports(method: PaymentAdapterRequest["method"]): boolean {
    return method === "upi";
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