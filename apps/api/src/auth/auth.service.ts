import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import type { AuthenticatedRequest } from "src/types";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private JwtService: JwtService,
  ) {}

  async validateEmail(email: string, password: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const { password, ...result } = user;
        return result;
      }
    } catch (_) {
      return null;
    }
    return null;
  }

  async login(user: any) {
    const payload: AuthenticatedRequest["user"] = { email: user.email, id: user.id };
    return {
      access_token: this.JwtService.sign(payload),
    };
  }
}
