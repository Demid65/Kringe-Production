import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const query = getQuery(event)

    const prisma = usePrisma()

    let title
    try {
        title = await prisma.course.findUnique({
            where: {
                id: Number.parseInt(query.courseId)
            },
            select: {
                title: true
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    if (title === null) {
        console.log('404 course', query.courseId)
        throw createError({
            statusCode: 404,
            statusMessage: 'Course does not exist'
        })
    }

    let files
    try {
        files = prisma.file.findMany({
            where: {
                courseId: Number.parseInt(query.courseId)
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    let articles
    try {
        articles = prisma.article.findMany({
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
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }



    const data = {
        title: title.title,
        files: await files,
        articles: await articles
    }

    return data

})