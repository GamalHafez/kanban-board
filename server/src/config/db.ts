import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

export const prisma = new PrismaClient({
  adapter,
  log:
    process.env["NODE_ENV"] === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});
