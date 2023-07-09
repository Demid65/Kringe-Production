// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@sidebase/nuxt-auth',
        '@nuxtjs/color-mode'
    ],
    auth: {
        basePath: '/auth'
    },
    purgeCSS: {
        enabled: false,
        safelist: [
            'article-block'
        ]
    },
    colorMode: {
        classSuffix: ''
    },
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
