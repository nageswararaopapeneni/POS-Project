export type DevicePlatform =
  | "WINDOWS"
  | "MACOS"
  | "LINUX"
  | "UBUNTU"
  | "ANDROID"
  | "IOS";

export type DeploymentMode = "LOCAL" | "CLOUD" | "HYBRID";

export type DeviceStatus = "ACTIVE" | "INACTIVE";

export interface Device {
  id: string;
  businessId: string;
  branchId?: string;
  platform: DevicePlatform;
  deviceType: string;
  deploymentMode: DeploymentMode;
  status: DeviceStatus;
  lastSyncAt?: Date;
  configuration: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}