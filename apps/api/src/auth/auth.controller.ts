import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserCreateDTO } from "../user/user.dto";

/**
 * This controller authenticates existing users and gives a token to handle
 * operations tied to the specific account that is logged in.
 */
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: UserCreateDTO) {
    const user = await this.authService.validateEmail(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    return this.authService.login(user);
  }
}
