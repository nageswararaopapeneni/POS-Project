import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BusinessService } from "./business.service";
import { CreateBusinessDto } from "./dto";

@Controller("businesses")
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() dto: CreateBusinessDto) {
    return this.businessService.create(dto);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.businessService.findById(id);
  }
}