import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  CreateProductUseCase,
  FindProductByBarcodeUseCase,
  GetProductUseCase,
} from "../../application";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller("products")
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly findProductByBarcodeUseCase: FindProductByBarcodeUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreateProductDto,
  ) {
    const result = await this.createProductUseCase.execute({
      businessId: body.businessId,
      name: body.name,
      price: body.price,
      sku: body.sku,
      barcode: body.barcode,
    });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  @Get(":productId")
  async get(
    @Param("productId") productId: string,
    @Query("businessId") businessId: string,
  ) {
    const result = await this.getProductUseCase.execute({
      businessId,
      productId,
    });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  @Get("lookup/barcode/:barcode")
  async findByBarcode(
    @Param("barcode") barcode: string,
    @Query("businessId") businessId: string,
  ) {
    const result =
      await this.findProductByBarcodeUseCase.execute({
        businessId,
        barcode,
      });

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }
}