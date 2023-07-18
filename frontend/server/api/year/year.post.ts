import {usePrisma} from "../../utils/usePrisma";
import {getServerSession} from "#auth";
import {useFileStorage} from "~/server/utils/useFileStorage";
import * as fs from "fs";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const session = await getServerSession(event)

    if (!body.title) {
        console.log(`400 create year (user: ${session.id})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!(session && session.role === 'ADMIN')) {
        console.log(`403 create year (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    const prisma = usePrisma()



    let year;
    try {
        year = await prisma.years.create({
            data: {
                title: body.title,
                priority: body.priority || 0
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    console.log(`create year ${year.id} (${year.title}) by ${session.id} (role: ${session.role})`)

    return year

})