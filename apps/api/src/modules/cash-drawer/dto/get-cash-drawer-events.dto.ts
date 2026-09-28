import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
} from "class-validator";

export class GetCashDrawerEventsDto {
  @IsString()
  businessId!: string;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @IsString()
  saleId?: string;

  @IsOptional()
  @IsIn(["none", "exception"])
  exceptionStatus?: "none" | "exception";
}