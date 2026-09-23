export type UserRole =
  | "owner"
  | "admin"
  | "manager"
  | "cashier"
  | "inventory_manager";

export interface AuthUserRecord {
  readonly id: string;
  readonly businessId: string;
  readonly branchId: string | null;
  readonly userId: string;
  readonly name: string;
  readonly role: UserRole;
  readonly status: "active" | "disabled";
  readonly passwordHash: string | null;
  readonly pinHash: string | null;
}

export interface AuthenticatedUser {
  readonly id: string;
  readonly businessId: string;
  readonly branchId: string | null;
  readonly userId: string;
  readonly name: string;
  readonly role: UserRole;
}

export interface AuthenticationResult {
  readonly user: AuthenticatedUser;
}