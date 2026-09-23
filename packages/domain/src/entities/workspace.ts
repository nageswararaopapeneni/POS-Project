export type WorkspaceStatus = "ACTIVE" | "SUSPENDED";

export interface Workspace {
  id: string;
  businessId: string;
  identifier: string;
  status: WorkspaceStatus;
  configuration: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}