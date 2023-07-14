import {usePrisma} from "../../utils/usePrisma";
import {getServerSession} from "#auth";
import {useFileStorage} from "~/server/utils/useFileStorage";
import * as fs from "fs";
import ye from "~/.output/public/_nuxt/index.31b9523d";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const session = await getServerSession(event)

    if (!body.courses) {
        console.log(`400 update year (user: ${session.id})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!(session && session.role === 'ADMIN')) {
        console.log(`403 update year (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    const prisma = usePrisma()

    let modified = 0

    for (const courseData of body.courses) {
        let course;
        try {
            course = await prisma.course.update({
                where: {
                    id: courseData.id,
                },
                data: {
                    title: courseData.title,
                    yearId: courseData.year.id
                }
            })
            modified++
        } catch (e) {
            console.log(e)
            throw createError({
                statusCode: 500,
                statusMessage: 'Something went wrong'
            })
        }
    }

    console.log(`update course ${modified} by ${session.id} (role: ${session.role})`)

    return {
        modified: modified
    }

})