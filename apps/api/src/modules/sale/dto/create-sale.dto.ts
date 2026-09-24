import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { SaleItemDto } from "./sale-item.dto";

export class CreateSaleDto {
  @IsString()
  businessId!: string;

  @IsOptional()
  @IsString()
  branchId?: string | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  items!: SaleItemDto[];
}