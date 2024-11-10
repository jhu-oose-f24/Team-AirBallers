import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();

/** @type {ReturnType<typeof prismaClientSingleton>} */
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
