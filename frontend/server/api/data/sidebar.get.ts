import {usePrisma} from "../../utils/usePrisma";

export default defineEventHandler(async (event) => {

    const prisma = usePrisma()

    const data = await prisma.years.findMany({
        select: {
            title: true,
            id: true,
            courses: true
        }
    })

    console.log(`get sidebar ${data}`)

    return data

})