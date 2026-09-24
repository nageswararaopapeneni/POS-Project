import { IsNotEmpty, IsString } from "class-validator";

export class AuthenticateUserDto {
  @IsString()
  @IsNotEmpty()
  businessId!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  passwordOrPin!: string;
}