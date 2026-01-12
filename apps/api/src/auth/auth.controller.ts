import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Handles a user registration operation.
   * @param body The informations used to register the new user.
   * @returns
   */
  @Post("register")
  public async register(@Body() body: AuthDTO) {
    return await this.authService.register(body);
  }

  /**
   * Delete a given given user with it's id.
   * @param id The id of the user to delete.
   * @returns
   */
  @Delete(":id")
  public async deleteUser(@Param("id") id: string) {
    return await this.authService.deleteUser(id);
  }

  /**
   * Handles a login operation.
   * @param body The informations used to log the new user in.
   * @returns
   */
  @Post("login")
  @HttpCode(HttpStatus.OK)
  public async login(@Body() body: AuthDTO) {
    return await this.authService.login(body);
  }
}
