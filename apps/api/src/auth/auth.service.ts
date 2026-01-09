import { Injectable } from "@nestjs/common";
import { UserCreateInput } from "@repo/db";
import PrismaService from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  public async register(user: UserCreateInput) {
    return await this.prismaService.user.create({ data: user });
  }
}
