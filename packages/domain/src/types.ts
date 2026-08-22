export type EntityId = string;

export type EntityStatus = "ACTIVE" | "INACTIVE";

export type UserRole =
  | "OWNER"
  | "ADMIN"
  | "MANAGER"
  | "CASHIER"
  | "INVENTORY_MANAGER";

export type DevicePlatform =
  | "WINDOWS"
  | "MACOS"
  | "LINUX"
  | "UBUNTU"
  | "ANDROID"
  | "IOS";

export type DeviceType = "DESKTOP" | "MOBILE" | "TABLET" | "OTHER";

export type DeploymentMode = "LOCAL" | "CLOUD" | "HYBRID";