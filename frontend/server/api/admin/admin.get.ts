import {usePrisma} from "../../utils/usePrisma";
import {getServerSession} from "#auth";

export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const session = await getServerSession(event)


    if (!session || session.role !== 'ADMIN') {
        console.log(`403 admin panel (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    const prisma = usePrisma()

    if (query.data === 'courses') {


        let years
        try {
            years = prisma.years.findMany({
                select: {
                    id: true,
                    title: true,
                    priority: true
                }
            })
        } catch (e) {
            console.log(e)
            throw createError({
                statusCode: 500,
                statusMessage: 'Something went wrong'
            })
        }

        let courses
        try {
            courses = prisma.course.findMany({
                select: {
                    id: true,
                    title: true,
                    year: {
                        select: {
                            title: true,
                            id: true
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

        return {
            years: await years,
            courses: await courses
        }
    }

    let files
    try {
        files = prisma.file.findMany({
            select: {
                id: true,
                title: true,
                author: true,
                course: true,
                path: true,
                type: true,
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    let articles
    try {
        articles = prisma.article.findMany({
            select: {
                id: true,
                title: true,
                author: true,
                courseId: true
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
        files: await files,
        articles: await articles
    }

    return data

})