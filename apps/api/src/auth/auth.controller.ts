import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Prisma } from "@repo/db";

@Controller("auth")
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  public async register(@Body() body: Prisma.UserCreateInput) {
    return await this.authService.register(body);
  }
}
