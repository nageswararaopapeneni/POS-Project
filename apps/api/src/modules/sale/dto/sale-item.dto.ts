import {
  IsNumber,
  IsNotEmpty,
  IsString,
  Min,
} from "class-validator";

export class SaleItemDto {
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsNumber()
  @Min(0.001)
  quantity!: number;
}