import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from "@nestjs/common";
import {
  CreateBusinessUseCase,
  GetBusinessUseCase,
} from "../../application";
import type { CreateBusinessDto } from "./dto/create-business.dto";

@Controller("businesses")
export class BusinessController {
  constructor(
    private readonly createBusinessUseCase: CreateBusinessUseCase,
    private readonly getBusinessUseCase: GetBusinessUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateBusinessDto) {
    return this.createBusinessUseCase.execute({
      name: body.name,
    });
  }

  @Get(":businessId")
  async get(@Param("businessId") businessId: string) {
    return this.getBusinessUseCase.execute({
      businessId,
    });
  }
}