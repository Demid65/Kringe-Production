import {getServerSession} from "#auth";
import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const data = await readBody(event)
    const session = await getServerSession(event)

    if (data === undefined) {
        console.log(`400 create discussion (course: ${data.courseId})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!session) {
        console.log(`403 create discussion (course: ${data.courseId})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }


    const prisma = usePrisma()

    const theme = await prisma.discussionTheme.create({
        data: {
            title: data.title,
            courseId: Number.parseInt(data.courseId),
            authorId: Number.parseInt(session.id)
        }
    })
    const message = await prisma.discussionMessage.create({
        data: {
            themeId: theme.id,
            authorId: Number.parseInt(session.id),
            content: data.message
        }
    })

    console.log(`create discussion ${theme.id} ${message}`)

    return theme

})