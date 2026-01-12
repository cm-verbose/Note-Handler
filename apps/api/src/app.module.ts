import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import PrismaService from "./prisma/prisma.service";
import { AuthService } from "./auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
})
export class AppModule {}
