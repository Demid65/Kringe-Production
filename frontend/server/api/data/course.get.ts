import {usePrisma} from "../../utils/usePrisma";

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

    const files = prisma.file.findMany({
        where: {
            courseId: Number.parseInt(query.courseId)
        }
    })

    const articles = prisma.article.findMany({
        where: {
            courseId: Number.parseInt(query.courseId)
        },
        select: {
            title: true,
            id: true,
            author: {
                select: {
                    username: true
                }
            }
        }
    })



    const data = {
        title: title.title,
        files: await files,
        articles: await articles
    }

    console.log(`get course ${query.courseId}`)

    return data

})