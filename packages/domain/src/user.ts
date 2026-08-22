import type { EntityId, EntityStatus, UserRole } from "./types";

export interface User {
  id: EntityId;
  businessId: EntityId;
  branchId?: EntityId;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  status: EntityStatus;
}