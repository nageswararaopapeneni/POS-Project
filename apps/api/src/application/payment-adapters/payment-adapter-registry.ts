import type {
  PaymentAdapter,
  PaymentAdapterRequest,
} from "./payment-adapter";
import type { PaymentMethod } from "./payment-method";

export class PaymentAdapterRegistry {
  constructor(
    private readonly adapters: readonly PaymentAdapter[],
  ) {}

  getAdapter(method: PaymentMethod): PaymentAdapter {
    const adapter = this.adapters.find((candidate) =>
      candidate.supports(method),
    );

    if (!adapter) {
      throw new Error(
        `No payment adapter registered for method: ${method}`,
      );
    }

    return adapter;
  }

  async process(
    request: PaymentAdapterRequest,
  ) {
    const adapter = this.getAdapter(request.method);

    return adapter.process(request);
  }
}