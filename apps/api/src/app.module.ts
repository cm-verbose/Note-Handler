import { Module } from "@nestjs/common";
import AuthController from "./auth/auth.controllers";
import { AuthService } from "./auth/auth.service";
import PrismaService from "./prisma/prisma.service";

@Module({ imports: [], controllers: [AuthController], providers: [AuthService, PrismaService] })
export class AppModule {}
