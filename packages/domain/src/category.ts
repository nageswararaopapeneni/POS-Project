import type { EntityId, EntityStatus } from "./types";

export interface Category {
  id: EntityId;
  businessId: EntityId;
  name: string;
  parentId?: EntityId;
  status: EntityStatus;
}