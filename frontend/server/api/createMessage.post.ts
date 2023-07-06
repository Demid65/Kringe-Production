import {FileCategory, PrismaClient} from "@prisma/client"
import {getServerSession} from "#auth";
import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const data = await readBody(event)
    const session = await getServerSession(event)

    if (data === undefined) {
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


    console.log(session)

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