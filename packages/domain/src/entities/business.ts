export type BusinessStatus = "ACTIVE" | "SUSPENDED";

export interface Business {
  id: string;
  name: string;
  contact?: string;
  address?: string;
  currency: string;
  taxConfiguration?: Record<string, unknown>;
  settings: Record<string, unknown>;
  status: BusinessStatus;
  createdAt: Date;
  updatedAt: Date;
}