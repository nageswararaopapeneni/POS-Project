import { ApplicationError } from "../common/application-error";
import type { BusinessRepository } from "../ports/business-repository";
import type { CreateBusinessInput } from "./create-business-input";

export interface CreateBusinessOutput {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class CreateBusinessUseCase {
  constructor(
    private readonly businessRepository: BusinessRepository,
  ) {}

  async execute(
    input: CreateBusinessInput,
  ): Promise<CreateBusinessOutput> {
    const name = input.name.trim();

    if (!name) {
      throw new ApplicationError(
        "VALIDATION_ERROR",
        "Business name is required",
      );
    }

    const business = await this.businessRepository.create({
      name,
    });

    return business;
  }
}