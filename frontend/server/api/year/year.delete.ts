import {usePrisma} from "../../utils/usePrisma";
import {getServerSession} from "#auth";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const session = await getServerSession(event)


    if (!body.yearId) {
        console.log(`400 delete year (user: ${session.id})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    const prisma = usePrisma()

    let years;
    try {
        years = await prisma.years.findUnique({
            where: {
                id: Number.parseInt(body.yearId)
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong at deleting'
        })
    }

    if (!years) {
        console.log(`404 delete year (year: ${body.yearId}) (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'Year not found'
        })
    }

    if (!(session && session.role === 'ADMIN')) {
        console.log(`403 delete year (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    let deletedYear;
    try {
        deletedYear = await prisma.years.delete({
            where: {
                id: Number.parseInt(body.yearId)
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    console.log(`delete year ${deletedYear.id} (${deletedYear.title}) by ${session.id} (role: ${session.role})`)

    return deletedYear

})