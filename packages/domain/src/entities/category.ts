export type CategoryStatus = "ACTIVE" | "INACTIVE";

export interface Category {
  id: string;
  businessId: string;
  name: string;
  parentId?: string;
  status: CategoryStatus;
  createdAt: Date;
  updatedAt: Date;
}