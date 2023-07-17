import {usePrisma} from "../../utils/usePrisma";
import {getServerSession} from "#auth";
import {useFileStorage} from "~/server/utils/useFileStorage";
import * as fs from "fs";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const session = await getServerSession(event)

    const storage = useFileStorage()

    if (!body.fileId) {
        console.log(`400 delete file (user: ${session.id})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    const prisma = usePrisma()

    let file
    try {
        file = await prisma.file.findUnique({
            where: {
                id: Number.parseInt(body.fileId)
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    if (!file) {
        console.log(`404 delete file (file: ${body.articleId}) (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'File not found'
        })
    }

    if (!(session && (session.role === 'ADMIN' || session.id === file.authorId))) {
        console.log(`403 delete file (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }



    let deletedFile
    try {
        deletedFile = await prisma.file.delete({
            where: {
                id: Number.parseInt(body.fileId)
            }
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    storage.removeItem(`${deletedFile.path}`).catch((err) => console.log(`could not remove file ${deletedFile.path} (${err})`))

    console.log(`delete file ${deletedFile.id} by ${session.id} (role: ${session.role})`)

    return deletedFile

})