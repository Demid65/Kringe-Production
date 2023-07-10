import {usePrisma} from "../utils/usePrisma";
import {useFileStorage} from "../utils/useFileStorage";

export default defineEventHandler(async (event) => {

    const data = await getQuery(event)

    if (!data.articleId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ArticleID required'
        })
    }

    const prisma = usePrisma()
    const storage = useFileStorage()

    const file = await prisma.article.findFirst({
        where: {
            id: Number.parseInt(data.articleId)
        },
        select: {
            path: true,
            title: true,
            author: {
                select: {
                    username: true
                }
            }
        }
    })

    if (!file) {
        throw createError({
            statusCode: 404,
            statusMessage: 'File not found'
        })
    }

    const value = await storage.getItem(`${file.path}`)

    if (value) {
        return {
            title: file.title,
            authorName: file.author.username,
            content: value
        }
    }

    throw createError({
        statusCode: 500,
        statusMessage: 'Article is somehow unavailable'
    })


})