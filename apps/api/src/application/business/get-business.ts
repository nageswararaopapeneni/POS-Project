import { ApplicationError } from "../common/application-error";
import type { BusinessRepository } from "../ports/business-repository";

export interface GetBusinessInput {
  readonly businessId: string;
}

export class GetBusinessUseCase {
  constructor(
    private readonly businessRepository: BusinessRepository,
  ) {}

  async execute(input: GetBusinessInput) {
    const businessId = input.businessId.trim();

    if (!businessId) {
      throw new ApplicationError(
        "VALIDATION_ERROR",
        "Business ID is required",
      );
    }

    const business = await this.businessRepository.findById(businessId);

    if (!business) {
      throw new ApplicationError(
        "NOT_FOUND",
        "Business not found",
      );
    }

    return business;
  }
}