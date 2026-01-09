import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@repo/db";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

@Injectable()
export default class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    dotenv.config({ quiet: true });
    console.log(process.env.DATABASE_URL);
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  onModuleInit() {
    return this.$connect();
  }
}
