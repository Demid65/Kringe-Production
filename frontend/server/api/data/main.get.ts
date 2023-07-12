import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const prisma = usePrisma()

    const popularCourses = await prisma.course.findMany({
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

    const newCourses = await prisma.course.findMany({
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

    const data = {
        new: newCourses,
        popular: popularCourses
    }

    return data

})