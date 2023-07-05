import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()

    const newCourses = await prisma.course.findMany({
        select: {
            id: true,
            title: true,
            year: {
                select: {
                    title: true
                }
            }
        }
    })

    const data = {
        new: newCourses,
        popular: newCourses
    }

    console.log(data)

    return data

})