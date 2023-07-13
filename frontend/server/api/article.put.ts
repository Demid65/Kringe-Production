import {getServerSession} from "#auth";
import { JSDOM } from "jsdom";
import {usePrisma} from "../utils/usePrisma";
import {useFileStorage} from "../utils/useFileStorage";

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

    const file = await prisma.article.findUnique({
        where: {
            id: Number.parseInt(data.articleId)
        }
    })

    if (!file) {
        console.log(`404 update article (article: ${data.articleId})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'Article not found'
        })
    }

    const updatedFile = await prisma.article.update({
        where: {
            id: Number.parseInt(data.articleId)
        },
        data: {
            title: data.title
        }
    })

    await storage.setItem(`/${file.path}/content.md`, data.content)

    console.log(`update article ${file.id} at ${file.path} by ${session.id}`)

    await storage.removeItem(`/${file.path}/para.json`).catch((err) => console.log(`could not remove para ${file.path} (${err})`))

    const yaGPTurl = 'https://300.ya.ru/api/sharing-url'
    const token = process.env.YAGPT_TOKEN || ''

    const host = process.env.DOMAIN || 'https://capstone.innopolis.university/docs/weekly-tasks/weekly-tasks/week_1/'
    const url = `/theme/${data.courseId}/article/${file.id}`

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

    if (isOk && res) {

        await JSDOM.fromURL(res['sharing_url']).then(async (dom) => {
            const document = dom.window.document
            const points = []

            for (let elementsByTagNameElement of document.getElementsByTagName('li')) {
                points.push(elementsByTagNameElement.innerHTML)
            }

            const data = {
                source: res['sharing_url'],
                points: points
            }

            await storage.setItem(`/${file.path}/para.json`, data)
        }, (err) => {
            console.log('err jsdom', err)
        })
    }

    return {
        url: url
    }

})