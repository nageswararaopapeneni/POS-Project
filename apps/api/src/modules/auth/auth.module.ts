import { Module } from "@nestjs/common";
import {
  AuthenticateUserUseCase,
  PasswordVerifier,
  UserRepository,
} from "../../application";
import { ScryptPasswordVerifier } from "../../infrastructure/auth/scrypt-password-verifier";
import { PrismaRepositoryModule } from "../../infrastructure/persistence/repositories/prisma";
import { REPOSITORY_TOKENS } from "../../infrastructure/persistence/repositories/prisma/prisma-repository.tokens";

@Module({
  imports: [PrismaRepositoryModule],
  providers: [
    {
      provide: ScryptPasswordVerifier,
      useClass: ScryptPasswordVerifier,
    },
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