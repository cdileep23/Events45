import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare a global type to store the Prisma client
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// If already created, use the existing client, else create new
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Export for use everywhere
export default prisma;

// Save it to globalThis only in dev mode (not in production)
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
