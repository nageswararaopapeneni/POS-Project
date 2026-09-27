import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import type { ReceiptNumberGenerator } from "../../../../application";

@Injectable()
export class PrismaReceiptNumberGenerator
  implements ReceiptNumberGenerator
{
  generate(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const suffix = randomUUID()
      .replace(/-/g, "")
      .slice(0, 8)
      .toUpperCase();

    return `RCP-${timestamp}-${suffix}`;
  }
}