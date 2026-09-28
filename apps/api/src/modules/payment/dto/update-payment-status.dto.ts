import { IsIn, IsString } from "class-validator";

export class UpdatePaymentStatusDto {
  @IsString()
  @IsIn(["pending", "successful", "failed", "reversed"])
  status!: string;
}