import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserCreateDTO, UserUpdateDTO } from "./user.dto";
import PrismaService from "src/prisma/prisma.service";
import { Prisma } from "@repo/db";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Creates a new user.
   * @param user The informations of the new user to create.
   */
  async createUser(user: UserCreateDTO) {
    const hashedPassord = await bcrypt.hash(user.password, 12);
    return await this.prismaService.user.create({
      data: {
        email: user.email,
        password: hashedPassord,
      },
      select: {
        id: true,
        email: true,
        created: true,
      },
    });
  }

  /**
   * Obtains a new user.
   * @param id The ID of the target user to.
   */
  async getUser(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Failed to get user ${id}: User not found`);
    }
    return user;
  }

  /**
   * Find a user by their email
   * @param email The email of the target user
   */
  async getUserByEmail(email: string) {
    try {
      return await this.prismaService.user.findUniqueOrThrow({
        where: { email },
      });
    } catch (err) {
      if (!(err instanceof Prisma.PrismaClientKnownRequestError)) throw err;
      const code = err.code;
      if (code !== "P2025") throw err;
      throw new NotFoundException(`Failed to get user with email \"${email}\": User not found`);
    }
  }

  /**
   * Updates a given user
   * @param id   The target ID of the user to update.
   * @param user The updated informations of the user.
   */
  async updateUser(id: string, user: UserUpdateDTO) {
    // Updating the password
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }

    try {
      return await this.prismaService.user.update({
        where: { id },
        data: {
          ...user,
        },
      });
    } catch (err) {
      if (!(err instanceof Prisma.PrismaClientKnownRequestError)) throw err;
      const code = err.code;
      switch (code) {
        case "P2025": {
          throw new NotFoundException(`Failed to update user ${id}: User not found`);
        }
        case "P2002": {
          throw new ConflictException(
            `Failed to update user with email \"${user.email}\": User already exists`,
          );
        }
        default: {
          throw err;
        }
      }
    }
  }

  /**
   * Deletes a user
   * @param id The ID of the target user to delete
   */
  async deleteUser(id: string) {
    try {
      return await this.prismaService.user.delete({
        where: { id },
      });
    } catch (err) {
      if (!(err instanceof Prisma.PrismaClientKnownRequestError)) throw err;
      const code = err.code;
      if (code !== "P2025") throw err;
      throw new NotFoundException(`Failed to delete user ${id}: User not found`);
    }
  }
}
