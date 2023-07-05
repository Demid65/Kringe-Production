import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()

    const data = await prisma.years.findMany({
        select: {
            title: true,
            id: true,
            courses: true
        }
    })

    console.log(data)

    return data

})