import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreatePaymentDto {
  @IsString()
  businessId!: string;

  @IsString()
  saleId!: string;

  @IsNumber()
  @Min(0.01)
  amount!: number;

  @IsString()
  method!: string;

  @IsOptional()
  @IsString()
  provider?: string | null;

  @IsOptional()
  @IsString()
  externalReference?: string | null;

  @IsOptional()
  @IsString()
  reference?: string | null;
}