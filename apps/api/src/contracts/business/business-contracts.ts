export interface CreateBusinessRequest {
  readonly name: string;
}

export interface BusinessResponse {
  readonly id: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}