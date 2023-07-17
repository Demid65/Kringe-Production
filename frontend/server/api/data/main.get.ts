import {usePrisma} from "../../utils/usePrisma";
import {useSettingsStorage} from "~/server/utils/useFileStorage";

export default defineEventHandler(async (event) => {

    const prisma = usePrisma()

    const settingsStorage = useSettingsStorage()

    const featuredArticleId = await settingsStorage.getItem('main:featuredArticleId')

    console.log('featured', featuredArticleId)

    let popularCourses
    try {
        popularCourses = prisma.course.findMany({
            select: {
                id: true,
                title: true,
                year: {
                    select: {
                        title: true
                    }
                }
            },
            orderBy: {
                articles: {
                    _count: 'desc'
                }
            },
            take: 5
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    let newCourses
    try {
        newCourses = prisma.course.findMany({
            select: {
                id: true,
                title: true,
                year: {
                    select: {
                        title: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            },
            take: 5
        })
    } catch (e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        })
    }

    let featuredArticle = null
    if (featuredArticleId) {
        try {
            featuredArticle = prisma.article.findUnique({
                where: {
                    id: featuredArticleId
                },
                select: {
                    id: true,
                    title: true,
                    course: true,
                    author: true
                }
            })
        } catch (e) {
            console.log(e)
            throw createError({
                statusCode: 500,
                statusMessage: 'Something went wrong'
            })
        }
    }

    const data = {
        featuredArticle: await featuredArticle,
        new: await newCourses,
        popular: await popularCourses
    }

    return data

})