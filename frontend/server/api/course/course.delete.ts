import {usePrisma} from "../../utils/usePrisma";
import {getServerSession} from "#auth";
import {useFileStorage} from "~/server/utils/useFileStorage";
import * as fs from "fs";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const session = await getServerSession(event)


    if (!body.courseId) {
        console.log(`400 delete course (user: ${session.id})`)
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid payload'
        })
    }

    const prisma = usePrisma()

    const course = await prisma.course.findUnique({
        where: {
            id: Number.parseInt(body.courseId)
        }
    })

    if (!course) {
        console.log(`404 delete course (course: ${body.courseId}) (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 404,
            statusMessage: 'Course not found'
        })
    }

    if (!(session && session.role === 'ADMIN')) {
        console.log(`403 delete course (user: ${session?.id || 'none'})`)
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthenticated'
        })
    }

    const deletedCourse = await prisma.course.delete({
        where: {
            id: Number.parseInt(body.courseId)
        }
    })

    console.log(`delete course ${deletedCourse.id} (${deletedCourse.title} - ${deletedCourse.yearId}) by ${session.id} (role: ${session.role})`)

    return deletedCourse

})