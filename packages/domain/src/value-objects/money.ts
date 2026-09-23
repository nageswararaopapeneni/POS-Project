export type Money = {
  amount: number;
  currency: string;
};

export function createMoney(amount: number, currency: string): Money {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("Money amount must be a non-negative finite number.");
  }

  if (!currency.trim()) {
    throw new Error("Currency is required.");
  }

  return {
    amount,
    currency: currency.toUpperCase(),
  };
}