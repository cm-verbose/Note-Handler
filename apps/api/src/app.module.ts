import { Module } from "@nestjs/common";
import AuthController from "./auth/auth.controller";
import PrismaService from "./prisma/prisma.service";
import { AuthService } from "./auth/auth.service";

@Module({ imports: [], controllers: [AuthController], providers: [AuthService, PrismaService] })
export class AppModule {}
