import type { AuthenticatedUser } from "../../application";

export interface AuthenticateUserResponse {
  readonly user: AuthenticatedUser;
}