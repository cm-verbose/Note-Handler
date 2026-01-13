import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";
import type { AuthenticatedRequest, LoginPayload } from "src/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "secret",
    });
  }

  /**
   * Validate the user information before allowing for operations with a user
   * @param payload The JWT payload
   * @returns
   */
  async validate(payload: LoginPayload): Promise<AuthenticatedRequest["user"]> {
    try {
      await this.userService.getUser(payload.id);
      return {
        id: payload.id,
        email: payload.email,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
