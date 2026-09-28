import { IsDateString, IsString } from "class-validator";

export class GetReconciliationDto {
  @IsString()
  businessId!: string;

  @IsDateString()
  businessDate!: string;
}