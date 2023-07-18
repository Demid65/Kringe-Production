import {usePrisma} from "../../utils/usePrisma";
import {useFileStorage} from "../../utils/useFileStorage";

export default defineEventHandler(async (event) => {

    const data = await getQuery(event)

    if (!data.articleId) {
        console.log(`400 create message (course: ${data.articleId})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'ArticleID required'
        })
    }

    const prisma = usePrisma()
    const storage = useFileStorage()

    let file
    try {
        file = await prisma.article.findFirst({
            where: {
                id: Number.parseInt(data.articleId)
            },
            select: {
                path: true,
                title: true,
                author: {
                    select: {
                        username: true,
                        id: true
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

    if (!file) {
        console.log(`404 get article (course: ${data.articleId})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'File not found'
        })
    }

    const value = await storage.getItem(`${file.path}/content.md`)
    const para = await storage.getItem(`${file.path}/para.json`)

    if (value) {
        return {
            title: file.title,
            author: file.author,
            content: value,
            para: para
        }
    }

    console.log(`500 create article (article: ${data.articleId}, path: ${file.path})`)
    throw createError({
        statusCode: 500,
        statusMessage: 'Article is somehow unavailable'
    })
})