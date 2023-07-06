import {usePrisma} from "../utils/usePrisma";
import {useFileStorage} from "../utils/useFileStorage";
import * as fs from "fs";
import {Readable} from "stream";

export default defineEventHandler(async (event) => {

    const data = await getQuery(event)

    if (!data.fileId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'FileID required'
        })
    }

    const prisma = usePrisma()
    const storage = useFileStorage()

    const file = await prisma.file.findFirst({
        where: {
            id: Number.parseInt(data.fileId)
        }
    })

    if (!file) {
        throw createError({
            statusCode: 404,
            statusMessage: 'File not found'
        })
    }

    const value = await storage.getItemRaw(`${file.path}`)

    if (value) {
        return sendStream(event, Readable.from(value))
    } else {
        throw createError({
            statusCode: 418,
            statusMessage: 'Sus'
        })
    }


})