import { PrismaClient } from "@prisma/client"

export default defineEventHandler(async (event) => {

    const query = getQuery(event)

    const prisma = new PrismaClient()

    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    const title = await prisma.course.findUnique({
        where: {
            id: Number.parseInt(query.courseId)
        },
        select: {
            title: true
        }
    })

    const files = await prisma.file.findMany({
        where: {
            courseId: Number.parseInt(query.courseId)
        }
    })

    const data = {
        title: title.title,
        files: files
    }

    console.log(data)

    return data

})