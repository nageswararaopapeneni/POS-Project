import type {
  DeploymentMode,
  DevicePlatform,
  DeviceType,
  EntityId,
  EntityStatus,
} from "./types";

export interface Device {
  id: EntityId;
  businessId: EntityId;
  branchId?: EntityId;
  platform: DevicePlatform;
  type: DeviceType;
  deploymentMode: DeploymentMode;
  status: EntityStatus;
  lastSyncAt?: Date;
  configuration?: Record<string, unknown>;
}