import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * The DTO used for user creation
 */
export class UserCreateDTO {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

/**
 * The DTO used for user update
 */
export class UserUpdateDTO {
  @IsString()
  @IsOptional()
  password?: string;
}
