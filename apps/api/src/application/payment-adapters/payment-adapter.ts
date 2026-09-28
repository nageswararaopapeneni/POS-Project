import type { PaymentStatus } from "../ports/payment-repository";
import type { PaymentMethod } from "./payment-method";

export interface PaymentAdapterRequest {
  readonly businessId: string;
  readonly saleId: string;
  readonly amount: number;
  readonly method: PaymentMethod;
  readonly provider?: string | null;
  readonly externalReference?: string | null;
  readonly reference?: string | null;
}

export interface PaymentAdapterResult {
  readonly status: PaymentStatus;
  readonly provider?: string | null;
  readonly externalReference?: string | null;
  readonly reference?: string | null;
}

export interface PaymentAdapter {
  readonly name: string;

  supports(method: PaymentMethod): boolean;

  process(
    request: PaymentAdapterRequest,
  ): Promise<PaymentAdapterResult>;
}