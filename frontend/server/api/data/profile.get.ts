import {usePrisma} from "../../utils/usePrisma";
import {getServerSession} from "#auth";

export default defineEventHandler(async (event) => {

    const session = await getServerSession(event)

    if (!session) {
        console.log(`403 profile panel (user: none)`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    const prisma = usePrisma()

    let files
    try {
        files = prisma.file.findMany({
            where: {
                authorId: session.id
            },
            select: {
                id: true,
                title: true,
                author: true,
                course: true,
                path: true,
                type: true,
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
                authorId: session.id
            },
            select: {
                id: true,
                title: true,
                author: true,
                courseId: true
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
        files: await files,
        articles: await articles
    }

    return data

})