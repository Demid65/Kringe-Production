import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const prisma = usePrisma()

    let data
    try {
        data = await prisma.years.findMany({
            select: {
                title: true,
                id: true,
                courses: true,
                priority: true
            },
            orderBy: {
                priority: 'desc'
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    return data

})