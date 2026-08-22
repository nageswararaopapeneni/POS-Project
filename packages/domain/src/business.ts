import type { EntityId } from "./types";

export interface Business {
  id: EntityId;
  name: string;
  contact?: string;
  address?: string;
  currency: string;
  taxConfiguration?: Record<string, unknown>;
  settings?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}