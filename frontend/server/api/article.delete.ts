import {usePrisma} from "../utils/usePrisma";
import {getServerSession} from "#auth";
import {useFileStorage} from "~/server/utils/useFileStorage";
import * as fs from "fs";

export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const session = await getServerSession(event)

    const storage = useFileStorage()

    if (!session || session.role !== 'ADMIN') {
        console.log(`403 admin panel (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    if (!query.articleId) {
        console.log(`400 admin panel (user: ${session.id})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    const prisma = usePrisma()

    const deletedArticle = await prisma.article.delete({
        where: {
            id: Number.parseInt(query.articleId)
        }
    })

    storage.removeItem(`${deletedArticle.path}/content.md`).catch((err) => console.log(`could not remove content ${deletedArticle.path} (${err})`))
    storage.removeItem(`${deletedArticle.path}/para.json`).catch((err) => console.log(`could not remove para ${deletedArticle.path} (${err})`))

    fs.rmdir(`./userfiles/${deletedArticle.path}`, (err) => console.log(`could not remove dir ${deletedArticle.path} (${err})`))

    console.log(`delete article ${deletedArticle.id} by ${session.id}`)

    return deletedArticle

})