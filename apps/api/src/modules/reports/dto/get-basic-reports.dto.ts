import { IsDateString, IsOptional, IsString } from "class-validator";

export class GetBasicReportsDto {
  @IsString()
  businessId!: string;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}