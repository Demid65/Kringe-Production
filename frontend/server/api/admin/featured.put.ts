import {usePrisma} from "../../utils/usePrisma";
import {getServerSession} from "#auth";
import {useFileStorage, useSettingsStorage} from "~/server/utils/useFileStorage";
import * as fs from "fs";
import ye from "~/.output/public/_nuxt/index.31b9523d";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const session = await getServerSession(event)

    const settingsStorage = useSettingsStorage()

    if (!body.articleId) {
        console.log(`400 update year (user: ${session.id})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!(session && session.role === 'ADMIN')) {
        console.log(`403 update featured (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    const prisma = usePrisma()

    let article
    try {
        article = await prisma.article.findUnique({
            where: {
                id: body.articleId,
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    if (!article) {
        console.log(`404 update featured (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'Article not found'
        })
    }

    settingsStorage.setItem('main:featuredArticleId', article.id).catch((err) => console.log(`could not update featured ${article.id} (${err})`))

    console.log(`update featured (set:${article.id}) (by ${session.id} role: ${session.role})`)

    return {
        article: article
    }

})