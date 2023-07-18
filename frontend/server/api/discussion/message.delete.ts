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

    if (!session || session.role !== 'ADMIN') {
        console.log(`403 delete message (course: ${data.courseId})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthorized'
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
        console.log(`404 delete message (message: ${data.messageId})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'Message not found'
        })
    }

    try {
        message = await prisma.discussionMessage.delete({
            where: {
                id: data.messageId
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    console.log(`delete message ${message.id} (user: ${session.id})`)

    return message

})