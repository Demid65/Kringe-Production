import {usePrisma} from "../utils/usePrisma";
import {getServerSession} from "#auth";
import {useFileStorage} from "~/server/utils/useFileStorage";
import * as fs from "fs";

export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const session = await getServerSession(event)

    const storage = useFileStorage()

    if (!query.articleId) {
        console.log(`400 delete article (user: ${session.id})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    const prisma = usePrisma()

    const article = await prisma.article.findUnique({
        where: {
            id: Number.parseInt(query.articleId)
        }
    })

    if (!article) {
        console.log(`404 delete article (article: ${query.articleId}) (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'Article not found'
        })
    }

    if (!(session && (session.role === 'ADMIN' || session.id === article.authorId))) {
        console.log(`403 delete article (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    const deletedArticle = await prisma.article.delete({
        where: {
            id: Number.parseInt(query.articleId)
        }
    })

    storage.removeItem(`${deletedArticle.path}/content.md`).catch((err) => console.log(`could not remove content ${deletedArticle.path} (${err})`))
    storage.removeItem(`${deletedArticle.path}/para.json`).catch((err) => console.log(`could not remove para ${deletedArticle.path} (${err})`))

    fs.rmdir(`./userfiles/${deletedArticle.path}`, (err) => console.log(`try to remove dir ${deletedArticle.path} (err: ${err})`))

    console.log(`delete article ${deletedArticle.id} by ${session.id} (role: ${session.role})`)

    return deletedArticle

})