import {
  ApplicationError,
  ApplicationResult,
  BusinessRepository,
  CreateBusinessRecord,
  success,
} from "../index";
import { CreateBusinessInput } from "./business-input";
import { BusinessOutput } from "./business-output";

export class CreateBusinessUseCase {
  constructor(
    private readonly businessRepository: BusinessRepository,
  ) {}

  async execute(
    input: CreateBusinessInput,
  ): Promise<ApplicationResult<BusinessOutput>> {
    const name = input.name.trim();

    if (!name) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business name is required.",
        ),
      };
    }

    const existing = await this.businessRepository.findByName(name);

    if (existing) {
      return {
        success: false,
        error: new ApplicationError(
          "CONFLICT",
          "A business with this name already exists.",
        ),
      };
    }

    const record: CreateBusinessRecord = {
      name,
    };

    const business = await this.businessRepository.create(record);

    return success({
      id: business.id,
      name: business.name,
      createdAt: business.createdAt,
      updatedAt: business.updatedAt,
    });
  }
}