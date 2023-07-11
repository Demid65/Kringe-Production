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
    colorMode: {
        dataValue: 'theme'
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
    },
    nitro: {
        preset: 'node-cluster',
        compressPublicAssets: true
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            noscript: [
                { children: 'JavaScript is required' }
            ]
        }
    }
})
