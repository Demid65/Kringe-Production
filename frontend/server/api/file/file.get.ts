import {usePrisma} from "../../utils/usePrisma";
import {useFileStorage} from "../../utils/useFileStorage";
import {Readable} from "stream";

export default defineEventHandler(async (event) => {

    const data = await getQuery(event)

    if (!data.fileId) {
        console.log(`400 get file (file: ${data.fileId})`)
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
        console.log(`404 get file (file: ${data.fileId})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'File not found'
        })
    }

    const value = await storage.getItemRaw(`${file.path}`)

    if (value) {
        return sendStream(event, Readable.from(value))
    } else {
        console.log(`403 get file (file: ${data.fileId}, path: ${file.path})`)
        throw createError({
            statusCode: 500,
            statusMessage: 'File is somehow unavailable'
        })
    }


})