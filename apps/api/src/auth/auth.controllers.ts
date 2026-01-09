import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { UserCreateInput } from "node_modules/@repo/db/generated/prisma/models";

@Controller("auth")
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  public async register(@Body() body: UserCreateInput) {
    return await this.authService.register(body);
  }
}
