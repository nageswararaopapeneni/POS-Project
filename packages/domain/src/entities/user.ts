export const UserRole = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  CASHIER: "CASHIER",
  INVENTORY_MANAGER: "INVENTORY_MANAGER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export type UserStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: string;
  businessId: string;
  branchId?: string;
  username: string;
  passwordHash: string;
  pinHash?: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}