import type { AuthUserRecord } from "../auth/auth-output";

export interface UserRepository {
  findByCredentials(
    businessId: string,
    userId: string,
  ): Promise<AuthUserRecord | null>;
}