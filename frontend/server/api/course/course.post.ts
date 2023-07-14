import {usePrisma} from "../../utils/usePrisma";
import {getServerSession} from "#auth";
import {useFileStorage} from "~/server/utils/useFileStorage";
import * as fs from "fs";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const session = await getServerSession(event)

    if (!(body.title && body.year)) {
        console.log(`400 create course (user: ${session.id})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!(session && session.role === 'ADMIN')) {
        console.log(`403 create course (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    const prisma = usePrisma()

    let course
    try {
        course = await prisma.course.create({
            data: {
                title: body.title,
                yearId: Number.parseInt(body.year)
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }


    console.log(`delete article ${course.id} (${course.title} ${course.yearId}) by ${session.id} (role: ${session.role})`)

    return course

})