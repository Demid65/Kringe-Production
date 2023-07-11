import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const prisma = usePrisma()

    const newCourses = await prisma.course.findMany({
        select: {
            id: true,
            title: true,
            year: {
                select: {
                    title: true
                }
            }
        }
    })

    const data = {
        new: newCourses,
        popular: newCourses
    }

    return data

})