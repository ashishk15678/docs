import { PrismaClient } from "@prisma/client";

// @ts-ignore
if (!global.prisma) {
    // @ts-ignore

    global.prisma = new PrismaClient();
}

// @ts-ignore
export default global.prisma;