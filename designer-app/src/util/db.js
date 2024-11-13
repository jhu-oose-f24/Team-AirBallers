import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();

/** @type {ReturnType<typeof prismaClientSingleton>} */
const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
