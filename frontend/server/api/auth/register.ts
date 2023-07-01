// file: ~/server/api/auth/register.ts
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    if (!(body.username && body.password)) {
        console.error(`illegal payload ${body}`)
        throw createError({
            statusCode: 400,
            statusMessage: `illegal payload`
        })
    }

    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({
        where: {
            username: body.username
        }
    })

    if (user === null) {

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                password: bcrypt.hashSync(body.password, 10)
            }
        })

        return newUser
    } else {
        console.error('Warning: Malicious login attempt registered, bad credentials provided')
        throw createError({
            statusCode: 409,
            statusMessage: `${body.username} already exists`
        })
    }
})