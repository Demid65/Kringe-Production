import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const query = getQuery(event)

    const prisma = usePrisma()

    const title = await prisma.course.findUnique({
        where: {
            id: Number.parseInt(query.courseId)
        },
        select: {
            title: true
        }
    })

    if (title === null) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Discussion does not exist'
        })
    }

    const themes = await prisma.discussionTheme.findMany({
        where: {
            courseId: Number.parseInt(query.courseId)
        },
        select: {
            id: true,
            title: true,
            author: {
                select: {
                    username: true
                }
            }
        }
    })

    const data = {
        title: title.title,
        topics: themes
    }

    return data

})