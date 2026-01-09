import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "node_modules/@repo/db/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

@Injectable()
export default class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    dotenv.config({ quiet: true });
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  onModuleInit() {
    return this.$connect();
  }
}
