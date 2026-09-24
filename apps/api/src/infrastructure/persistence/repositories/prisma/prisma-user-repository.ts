import { Injectable } from "@nestjs/common";
import type {
  AuthUserRecord,
  UserRepository,
  UserRole,
} from "../../../../application";
import { PrismaClientService } from "../../prisma";

function toUserRole(role: string): UserRole {
  switch (role) {
    case "owner":
    case "admin":
    case "manager":
    case "cashier":
    case "inventory_manager":
      return role;

    default:
      throw new Error(`Unsupported user role: ${role}`);
  }
}

function toUserStatus(
  status: string,
): "active" | "disabled" {
  switch (status) {
    case "active":
    case "disabled":
      return status;

    default:
      throw new Error(`Unsupported user status: ${status}`);
  }
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaClientService,
  ) {}

  async findByCredentials(
    businessId: string,
    userId: string,
  ): Promise<AuthUserRecord | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        businessId,
        userId,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      businessId: user.businessId,
      branchId: user.branchId,
      userId: user.userId,
      name: user.name,
      role: toUserRole(user.role),
      status: toUserStatus(user.status),
      passwordHash: user.passwordHash,
      pinHash: user.pinHash,
    };
  }
}