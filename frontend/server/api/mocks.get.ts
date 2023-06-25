import {mainData, sidebarTree, themeTopics} from "../../utils/mocks";

export default defineEventHandler((event) => {
    const query = getQuery(event)
    let returnData = {}
    switch (query.data) {
        case 'sidebar':
            returnData = sidebarTree
            break
        case 'main':
            returnData = mainData
            break
        case 'theme':
            returnData = themeTopics
            break
        default:
            throw createError({
                statusCode: 400,
                statusMessage: 'No theme found',
            })
    }

    return returnData
})