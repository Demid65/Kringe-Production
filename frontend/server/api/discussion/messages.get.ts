import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const query = getQuery(event)

    const prisma = usePrisma()

    const theme = await prisma.discussionTheme.findUnique({
        where: {
            id: Number.parseInt(query.themeId)
        },
        select: {
            title: true
        }
    })

    if (theme === null) {
        console.log(`404 discussion (course: ${query.courseId}) (disc: ${query.themeId})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'Discussion does not exist'
        })
    }

    const messages = await prisma.discussionMessage.findMany({
        where: {
            themeId: Number.parseInt(query.themeId)
        },
        select: {
            id: true,
            content: true,
            author: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    const data = {
        title: theme.title,
        messages: messages
    }

    return data

})