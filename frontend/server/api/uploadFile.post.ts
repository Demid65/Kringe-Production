import {FileCategory, PrismaClient} from "@prisma/client"
import * as fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import {getServerSession} from "#auth";
import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const data = await readMultipartFormData(event)
    const session = await getServerSession(event)

    const prisma = usePrisma()

    if (data === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    if (!session) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    console.log(session)

    const parsedData = {
        id: 0,
        category: '',
        title: '',
        type: '',
        path: ''
    }

    const validation = {
        hasCourse: false,
        hasCategory: false,
        hasFile: false
    }

    const newFilename = uuidv4()

    for (let datum of data) {
        if (datum.name === 'id') {
            parsedData.id = Number.parseInt(datum.data.toString())
            validation.hasCourse = true

        } else if (datum.name === 'category') {
            parsedData.category = datum.data.toString()
            validation.hasCategory = true

        } else if (datum.name === 'file') {

            const splitted_filename = datum.filename?.split('.')
            const name = splitted_filename.at(0)
            const ext = splitted_filename.length > 1 ? splitted_filename.at(-1) : ''

            const path = newFilename + '.' + ext

            fs.writeFileSync(`public/userfiles/${path}`, datum.data)
            parsedData.path = `userfiles/${path}`
            parsedData.type = ext
            parsedData.title = name

            validation.hasFile = true

        }
    }

    if (!(validation.hasFile && validation.hasCategory && validation.hasCourse)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    const file = await prisma.file.create({
        data: {
            title: parsedData.title,
            courseId: parsedData.id,
            path: parsedData.path,
            type: parsedData.type,
            category: parsedData.category,
            authorId: session.id
        }
    })

    console.log(`upload file ${file}`)

    return file

})