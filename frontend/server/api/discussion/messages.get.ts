import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const query = getQuery(event)

    const prisma = usePrisma()


    let theme
    try {
        theme = await prisma.discussionTheme.findUnique({
            where: {
                id: Number.parseInt(query.themeId)
            },
            select: {
                title: true
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    if (theme === null) {
        console.log(`404 discussion (course: ${query.courseId}) (disc: ${query.themeId})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'Discussion does not exist'
        })
    }


    let messages
    try {
        messages = await prisma.discussionMessage.findMany({
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
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    const data = {
        title: theme.title,
        messages: messages
    }

    return data

})