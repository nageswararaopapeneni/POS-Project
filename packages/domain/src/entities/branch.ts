export type BranchStatus = "ACTIVE" | "INACTIVE";

export interface Branch {
  id: string;
  businessId: string;
  name: string;
  address?: string;
  status: BranchStatus;
  settings: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}