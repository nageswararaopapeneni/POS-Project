import {
  IsIn,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class RecordCashDrawerEventDto {
  @IsString()
  businessId!: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsOptional()
  @IsString()
  deviceId?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsIn(["open", "close"])
  eventType!: "open" | "close";

  @IsString()
  @MaxLength(500)
  reason!: string;

  @IsOptional()
  @IsString()
  saleId?: string;

  @IsOptional()
  @IsIn(["none", "exception"])
  exceptionStatus?: "none" | "exception";

  @IsOptional()
  @IsISO8601()
  openedAt?: string;

  @IsOptional()
  @IsISO8601()
  closedAt?: string;
}