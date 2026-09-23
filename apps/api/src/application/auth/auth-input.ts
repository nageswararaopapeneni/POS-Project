export interface AuthenticateUserInput {
  readonly businessId: string;
  readonly userId: string;
  readonly passwordOrPin: string;
}