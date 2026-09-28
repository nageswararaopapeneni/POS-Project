import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateReconciliationDto {
  @IsString()
  businessId!: string;

  @IsDateString()
  businessDate!: string;

  @IsNumber()
  @Min(0)
  actualCash!: number;

  @IsOptional()
  @IsString()
  closedBy?: string;
}