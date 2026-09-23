import {
  ApplicationError,
  ApplicationResult,
  success,
} from "../index";
import type { AuthenticateUserInput } from "./auth-input";
import type {
  AuthenticatedUser,
  AuthenticationResult,
} from "./auth-output";
import type { PasswordVerifier } from "../ports/password-verifier";
import type { UserRepository } from "../ports/user-repository";

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordVerifier: PasswordVerifier,
  ) {}

  async execute(
    input: AuthenticateUserInput,
  ): Promise<ApplicationResult<AuthenticationResult>> {
    const businessId = input.businessId.trim();
    const userId = input.userId.trim();
    const passwordOrPin = input.passwordOrPin;

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    if (!userId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "User ID is required.",
        ),
      };
    }

    if (!passwordOrPin) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Password or PIN is required.",
        ),
      };
    }

    const user = await this.userRepository.findByCredentials(
      businessId,
      userId,
    );

    if (!user || user.status !== "active") {
      return {
        success: false,
        error: new ApplicationError(
          "AUTHENTICATION_FAILED",
          "Invalid credentials.",
        ),
      };
    }

    let authenticated = false;

    if (user.passwordHash) {
      authenticated = await this.passwordVerifier.verify(
        passwordOrPin,
        user.passwordHash,
      );
    }

    if (!authenticated && user.pinHash) {
      authenticated = await this.passwordVerifier.verify(
        passwordOrPin,
        user.pinHash,
      );
    }

    if (!authenticated) {
      return {
        success: false,
        error: new ApplicationError(
          "AUTHENTICATION_FAILED",
          "Invalid credentials.",
        ),
      };
    }

    const authenticatedUser: AuthenticatedUser = {
      id: user.id,
      businessId: user.businessId,
      branchId: user.branchId,
      userId: user.userId,
      name: user.name,
      role: user.role,
    };

    return success<AuthenticationResult>({
      user: authenticatedUser,
    });
  }
}