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

    const files = prisma.file.findMany({
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

    const articles = prisma.article.findMany({
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

    const data = {
        files: await files,
        articles: await articles
    }

    return data

})