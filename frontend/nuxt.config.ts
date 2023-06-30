// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    components: [
        {
            path: '~/components/main/',
            pathPrefix: false
        },
        {
            path: '~/components/course/',
            pathPrefix: false
        },
        {
            path: '~/components/course/discussion/',
            pathPrefix: false
        },
        {
            path: '~/components/sidebar/',
            pathPrefix: false
        },
        {
            path: '~/components/',
            pathPrefix: false
        },
    ],
    devtools: {
        enabled: true
    }
})
