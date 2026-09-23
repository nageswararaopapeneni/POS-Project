import {
  ApplicationError,
  ApplicationResult,
  BusinessRepository,
  success,
} from "../index";
import { GetBusinessInput } from "./business-input";
import { BusinessOutput } from "./business-output";

export class GetBusinessUseCase {
  constructor(
    private readonly businessRepository: BusinessRepository,
  ) {}

  async execute(
    input: GetBusinessInput,
  ): Promise<ApplicationResult<BusinessOutput>> {
    const businessId = input.businessId.trim();

    if (!businessId) {
      return {
        success: false,
        error: new ApplicationError(
          "VALIDATION_ERROR",
          "Business ID is required.",
        ),
      };
    }

    const business =
      await this.businessRepository.findById(businessId);

    if (!business) {
      return {
        success: false,
        error: new ApplicationError(
          "NOT_FOUND",
          "Business was not found.",
        ),
      };
    }

    return success({
      id: business.id,
      name: business.name,
      createdAt: business.createdAt,
      updatedAt: business.updatedAt,
    });
  }
}