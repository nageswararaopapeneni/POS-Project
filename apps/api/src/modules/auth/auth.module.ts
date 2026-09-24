import { Module } from "@nestjs/common";
import {
  AuthenticateUserUseCase,
  type PasswordVerifier,
  type UserRepository,
} from "../../application";
import { ScryptPasswordVerifier } from "../../infrastructure/auth/scrypt-password-verifier";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.module";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";
import { AuthController } from "./auth.controller";

@Module({
  imports: [PrismaRepositoryModule],
  controllers: [AuthController],
  providers: [
    ScryptPasswordVerifier,
    {
      provide: AuthenticateUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        passwordVerifier: PasswordVerifier,
      ) =>
        new AuthenticateUserUseCase(
          userRepository,
          passwordVerifier,
        ),
      inject: [
        REPOSITORY_TOKENS.user,
        ScryptPasswordVerifier,
      ],
    },
  ],
  exports: [AuthenticateUserUseCase],
})
export class AuthModule {}