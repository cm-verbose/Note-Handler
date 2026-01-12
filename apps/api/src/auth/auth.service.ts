import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Prisma } from "@repo/db";
import { JwtService } from "@nestjs/jwt";
import PrismaService from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { AuthDTO } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * @param user The new user's information
   * @returns The newly created user
   */
  public async register(user: AuthDTO): Promise<Omit<Prisma.UserCreateInput, "password">> {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    return await this.prismaService.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }

  /**
   * Delete a user
   * @param id The id of the user to delete
   */
  public async deleteUser(id: string) {
    try {
      await this.prismaService.user.delete({
        where: { id },
      });
    } catch (err) {
      if (!(err instanceof Prisma.PrismaClientKnownRequestError)) throw err;
      const code = err.code;
      if (code !== "P2025") return null;
      throw new NotFoundException(`Failed to delete ${id}: User not found`);
    }
  }

  /**
   * Log into a user's account
   * @param user The user's information
   */
  async login(
    user: AuthDTO,
  ): Promise<{ access_token: string; user: { id: string; email: string } }> {
    const targetUser = await this.prismaService.user.findUnique({ where: { email: user.email } });
    if (!targetUser) {
      throw new UnauthorizedException("Invalid email for user");
    }

    const isCorrectPassword = await bcrypt.compare(user.password, targetUser.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(`Invalid password given for ${targetUser.email}`);
    }

    const payload = {
      subject: targetUser.id,
      email: targetUser.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: targetUser.id,
        email: targetUser.email,
      },
    };
  }
}
