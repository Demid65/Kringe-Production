import {getServerSession} from "#auth";
import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const data = await readBody(event)
    const session = await getServerSession(event)

    if (data === undefined) {
        console.log(`400 edit message (course: ${data.courseId})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!session) {
        console.log(`403 edit message (course: ${data.courseId})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    const prisma = usePrisma()

    let message
    try {
        message = await prisma.discussionMessage.findUnique({
            where: {
                id: Number.parseInt(data.messageId)
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    if (!message) {
        console.log(`404 edit message (message: ${data.messageId})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'Message not found'
        })
    }

    if (session.id !== message.authorId) {
        console.log(`403 edit message (message: ${message.id}) (user: ${session.id})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthorized'
        })
    }

    try {
        message = await prisma.discussionMessage.update({
            where: {
                id: data.messageId
            },
            data: {
                content: data.message,
                edited: true
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    console.log(`edit message ${message.id} (user: ${session.id})`)

    return message

})