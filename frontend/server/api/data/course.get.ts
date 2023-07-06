import { PrismaClient } from "@prisma/client"
import {usePrisma} from "../../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const query = getQuery(event)

    const prisma = usePrisma()

    const title = await prisma.course.findUnique({
        where: {
            id: Number.parseInt(query.courseId)
        },
        select: {
            title: true
        }
    })

    if (title === null) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Course does not exist'
        })
    }

    const files = await prisma.file.findMany({
        where: {
            courseId: Number.parseInt(query.courseId)
        }
    })

    const data = {
        title: title.title,
        files: files
    }

    console.log(`get courses ${title} ${data}`)

    return data

})