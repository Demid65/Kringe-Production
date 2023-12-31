import {getServerSession} from "#auth";
import { JSDOM } from "jsdom";
import {usePrisma} from "../../utils/usePrisma";
import {useFileStorage} from "../../utils/useFileStorage";
import {useBrowser} from "~/server/utils/useBrowser";

export default defineEventHandler(async (event) => {

    const data = await readBody(event)
    const session = await getServerSession(event)

    const prisma = usePrisma()
    const storage = useFileStorage()

    if (data === undefined) {
        console.log(`400 upload article (article: ${data?.articleId})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!(data.title && data.articleId && data.content)) {
        console.log(`400 update article (article: ${data.articleId})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!session) {
        console.log(`403 upload article (course: ${data.courseId})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }



    let file
    try {
        file = await prisma.article.findUnique({
            where: {
                id: Number.parseInt(data.articleId)
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
        console.log(`404 update article (article: ${data.articleId})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'Article not found'
        })
    }



    let updatedFile
    try {
        updatedFile = await prisma.article.update({
            where: {
                id: Number.parseInt(data.articleId)
            },
            data: {
                title: data.title
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    await storage.setItem(`/${updatedFile.path}/content.md`, data.content)

    console.log(`update article ${updatedFile.id} at ${updatedFile.path} by ${session.id}`)

    await storage.removeItem(`/${file.path}/para.json`).catch((err) => console.log(`could not remove para ${updatedFile.path} (${err})`))

    const yaGPTurl = 'https://300.ya.ru/api/sharing-url'
    const token = process.env.YAGPT_TOKEN || ''

    const host = process.env.DOMAIN || ''
    const url = `/theme/${updatedFile.courseId}/article/${updatedFile.id}`

    let isOk = true

    const res = await $fetch(yaGPTurl, {
        method: 'POST',
        body: {
            'article_url': host + url
        },
        headers: {
            'Authorization': `OAuth ${token}`
        }
    }).catch((err) => {
        isOk = false
        console.log('err fetching yagpt', err)
    })

    console.log(`fetched yagpt at upload article ${file.id} by ${session.id} (${res?.status} ${res?.sharing_url})`)

    if (isOk && res && res.status === 'success') {

        try {
            const browser = await useBrowser()

            const context = await browser.newContext();
            const page = await context.newPage();

            // The actual interesting bit
            await page.goto(res.sharing_url || '');

            // console.log(await page.content())

            const points = await page.locator('li').allInnerTexts()

            const data = {
                source:  res?.sharing_url ? res.sharing_url : '',
                points: points
            }

            await storage.setItem(`/${updatedFile.path}/para.json`, data)

            console.log(`generated points for ${file.id} (length: ${points.length})`)

            // Teardown
            await context.close();
        } catch (e) {
            console.log(e)
        }
    }

    return {
        url: url
    }

})