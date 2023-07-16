import { v4 as uuidv4 } from 'uuid';
import {getServerSession} from "#auth";
import {usePrisma} from "../../utils/usePrisma";
import {useFileStorage} from "../../utils/useFileStorage";
import {useBrowser} from "~/server/utils/useBrowser";

export default defineEventHandler(async (event) => {

    const data = await readBody(event)
    const session = await getServerSession(event)

    const prisma = usePrisma()
    const storage = useFileStorage()

    if (data === undefined) {
        console.log(`400 upload article (course: ${data?.courseId})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!(data.title && data.courseId && data.content)) {
        console.log(`400 upload article (course: ${data.courseId})`)
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

    const newFilename = uuidv4()
    const path = `/articles/${newFilename}`

    await storage.setItem(`/${path}/content.md`, data.content)

    let file
    try {
        file = await prisma.article.create({
            data: {
                title: data.title,
                courseId: Number.parseInt(data.courseId),
                path: path,
                authorId: Number.parseInt(session.id)
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

    console.log(`upload article ${file.id} to ${file.path} by ${session.id}`)

    const yaGPTurl = 'https://300.ya.ru/api/sharing-url'
    const token = process.env.YAGPT_TOKEN || ''

    const host = process.env.DOMAIN || ''
    const url = `/theme/${file.courseId}/article/${file.id}`

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

    if (true) {

        try {
            const browser = await useBrowser()

            const context = await browser.newContext();
            const page = await context.newPage();

            // The actual interesting bit
            await page.goto(res?.sharing_url || 'https://300.ya.ru/dGxRCx56');

            const points = await page.locator('li').allInnerTexts()

            const data = {
                source:  res?.sharing_url ? res.sharing_url : '',
                points: points
            }

            console.log(`generated points for ${file.id} (length: ${points.length})`)

            await storage.setItem(`/${path}/para.json`, data)

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