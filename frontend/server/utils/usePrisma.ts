import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()

export function usePrisma() {
    return prisma
}