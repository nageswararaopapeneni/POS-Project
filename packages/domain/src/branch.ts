import type { EntityId, EntityStatus } from "./types";

export interface Branch {
  id: EntityId;
  businessId: EntityId;
  name: string;
  address?: string;
  status: EntityStatus;
  settings?: Record<string, unknown>;
}