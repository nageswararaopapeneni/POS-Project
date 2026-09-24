import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { AuthenticateUserUseCase } from "../../application/auth/authenticate-user";
import { AuthenticateUserDto } from "./dto/authenticate-user.dto";
import type { AuthenticateUserResponse } from "./auth-response";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authenticateUser: AuthenticateUserUseCase,
  ) {}

  @Post("login")
  async login(
    @Body() input: AuthenticateUserDto,
  ): Promise<AuthenticateUserResponse> {
    const result = await this.authenticateUser.execute({
      businessId: input.businessId,
      userId: input.userId,
      passwordOrPin: input.passwordOrPin,
    });

    if (!result.success) {
      throw result.error;
    }

    return {
      user: result.data.user,
    };
  }
}