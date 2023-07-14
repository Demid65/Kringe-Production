import {usePrisma} from "../../utils/usePrisma";
import {getServerSession} from "#auth";
import {useFileStorage} from "~/server/utils/useFileStorage";
import * as fs from "fs";
import ye from "~/.output/public/_nuxt/index.31b9523d";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const session = await getServerSession(event)

    if (!body.years) {
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

    for (const yearData of body.years) {
        let year;
        try {
            year = await prisma.years.update({
                where: {
                    id: yearData.id,
                },
                data: {
                    priority: yearData.priority,
                    title: yearData.title
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

    console.log(`update years ${modified} by ${session.id} (role: ${session.role})`)

    return {
        modified: modified
    }

})