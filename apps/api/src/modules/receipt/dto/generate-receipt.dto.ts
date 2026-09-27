import {
  IsNotEmpty,
  IsString,
} from "class-validator";

export class GenerateReceiptDto {
  @IsString()
  @IsNotEmpty()
  businessId!: string;

  @IsString()
  @IsNotEmpty()
  saleId!: string;
}