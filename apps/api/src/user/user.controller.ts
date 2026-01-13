import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserCreateDTO, UserUpdateDTO } from "./user.dto";
import { AuthGuard } from "@nestjs/passport";
import type { AuthenticatedRequest } from "src/types";

/**
 * Handles common operations with user authentication
 */
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Creates and registers a new user to the platform.
   * POST /user
   * @param user The user information used for creation.
   */
  @Post()
  async createUser(@Body() user: UserCreateDTO) {
    return this.userService.createUser(user);
  }

  /**
   * Obtain's a user's details given their ID.
   * GET /user/:id
   * @param id The ID of the target user to get
   */
  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  async getUser(@Param("id") id: string) {
    console.log("GET");
    return this.userService.getUser(id);
  }

  /**
   * Update a user's informations without a complete replacement.
   * PATCH /user/:id
   * @param user The user's updated informations.
   */
  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  async updateUser(
    @Param("id") id: string,
    @Body() user: UserUpdateDTO,
    @Req() req: AuthenticatedRequest,
  ) {
    if (id !== req.user.id) {
      throw new UnauthorizedException(`Failed to delete account: Invalid credentials`);
    }
    return this.userService.updateUser(id, user);
  }

  /**
   * Deletes a user using their account's ID.
   * DELETE /user/:id
   * @param id The ID to the target user to delete.
   */
  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async deleteUser(@Param("id") id: string, @Req() req: AuthenticatedRequest) {
    if (id !== req.user.id) {
      throw new UnauthorizedException(`Failed to delete account: Invalid credentials`);
    }
    return this.userService.deleteUser(id);
  }
}
