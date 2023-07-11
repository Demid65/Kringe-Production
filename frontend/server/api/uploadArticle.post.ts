import { v4 as uuidv4 } from 'uuid';
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
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!(data.title && data.courseId && data.content)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!session) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    const newFilename = uuidv4()
    const path = `/articles/${newFilename}`

    await storage.setItem(`/${path}/content.md`, data.content)

    const file = await prisma.article.create({
        data: {
            title: data.title,
            courseId: Number.parseInt(data.courseId),
            path: path,
            authorId: Number.parseInt(session.id)
        }
    })

    console.log(`upload file ${path} by ${session.id}`)

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

            // console.log('points ', points)

            await storage.setItem(`/${path}/para.json`, points)
        }, (err) => {
            console.log('err jsdom', err)
        })
    }

    return {
        url: url
    }

})