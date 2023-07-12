import {getServerSession} from "#auth";
import {usePrisma} from "../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const data = await readBody(event)
    const session = await getServerSession(event)

    if (data === undefined) {
        console.log(`400 create message (course: ${data.courseId})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!session) {
        console.log(`403 create message (course: ${data.courseId})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    const prisma = usePrisma()

    const message = await prisma.discussionMessage.create({
        data: {
            themeId: Number.parseInt(data.themeId),
            authorId: session.id,
            content: data.message
        }
    })

    console.log(`create message ${message}`)

    return message

})