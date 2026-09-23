export function decimalToNumber(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "bigint") {
    return Number(value);
  }

  if (
    value !== null &&
    typeof value === "object" &&
    "toString" in value
  ) {
    return Number(value.toString());
  }

  return Number(value);
}