import {discussionTopics, discussionMessages, mainData, sidebarTree, themeTopics, articleData} from "../../utils/mocks";
import {readFile} from "fs";

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
        case 'disc':
            returnData = discussionTopics
            break
        case 'messages':
            returnData = discussionMessages
            break
        case 'article':
            returnData = articleData
            break
        default:
            throw createError({
                statusCode: 400,
                statusMessage: 'No theme found',
            })
    }

    return returnData
})