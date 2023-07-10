import { v4 as uuidv4 } from 'uuid';
import {getServerSession} from "#auth";
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
    const path = `/articles/${newFilename}.md`

    await storage.setItem(`/${path}`, data.content)

    const file = await prisma.article.create({
        data: {
            title: data.title,
            courseId: Number.parseInt(data.courseId),
            path: path,
            authorId: Number.parseInt(session.id)
        }
    })

    console.log(`upload file ${path} by ${session.id}`)

    return {
        url: `/theme/${data.courseId}/article/${file.id}`
    }

})