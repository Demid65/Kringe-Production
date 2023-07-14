import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const prisma = usePrisma()

    let popularCourses
    try {
        popularCourses = prisma.course.findMany({
            select: {
                id: true,
                title: true,
                year: {
                    select: {
                        title: true
                    }
                }
            },
            orderBy: {
                articles: {
                    _count: 'desc'
                }
            },
            take: 5
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    let newCourses
    try {
        newCourses = prisma.course.findMany({
            select: {
                id: true,
                title: true,
                year: {
                    select: {
                        title: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            },
            take: 5
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    const data = {
        new: await newCourses,
        popular: await popularCourses
    }

    return data

})