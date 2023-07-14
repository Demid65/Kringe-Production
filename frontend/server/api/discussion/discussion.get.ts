import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const query = getQuery(event)

    const prisma = usePrisma()

    let title
    try {
        title = await prisma.course.findUnique({
            where: {
                id: Number.parseInt(query.courseId)
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

    if (title === null) {
        console.log(`404 discussion (course: ${query.courseId})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'Discussion does not exist'
        })
    }

    let themes
    try {
        themes = await prisma.discussionTheme.findMany({
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
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    const data = {
        title: title.title,
        topics: themes
    }

    return data

})