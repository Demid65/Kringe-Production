<script setup lang="ts">
    import {routesMap} from "~/utils/routes";
    import {useMarkdown} from "~/utils/useMarkdown";

    const colorMode = useColorMode()
    const route = useRoute()
    const { status, data } = useAuth()
    const md = useMarkdown()

    const { data: article, pending, error, refresh } = await useFetch(routesMap['getArticle'], {
        query: {
            articleId: route.params.articleId
        }
    })

    function parseMarkdown(content: any) {
        return md.render(content)
    }
</script>

<template>
    <Head>
        <Title>
            {{ article?.title ? article.title : 'Wait' }}
        </Title>
        <Link v-if="colorMode.value === 'dark'" rel="stylesheet" href="/css/atom-one-dark.css" crossorigin=""/>
        <Link v-else rel="stylesheet" href="/css/atom-one-light.css" crossorigin="" />
    </Head>
    <div class="flex flex-col container mx-auto px-2 h-full w-0 min-w-full">
        <div class="card bg-base-200 h-0 min-h-full overflow-y-auto scrollbar">
            <FetchPlaceholder :pending="pending" :error="error">
                <div class="card-body p-4 gap-0">
                    <div class="card-title rounded-lg bg-base-300 p-4 mb-2">
                        <h1 class="text-lg break-all">{{ article.title }}</h1>
                        <NuxtLink :to="`/theme/${route.params.id}/`" class="ml-auto flex-none min-w-max">
                            <button class="btn btn-sm btn-outline flex-none">Go back</button>
                        </NuxtLink>
                    </div>
                    <div v-if="article.para !== null && article.para.points.length > 0" class="collapse collapse-arrow bg-base-300">
                        <input type="checkbox" />
                        <div class="collapse-title text-xl font-medium">
                            Summary by YandexGPT <div class="badge badge-accent badge-outline">RU</div>
                        </div>
                        <div class="collapse-content">
                            <div class="alert border-accent flex flex-row mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>The summary may contain errors and inaccuracies</span>
                            </div>
                            <ul class="list-disc pl-4">
                                <li v-for="point in article.para?.points">
                                    {{ point }}
                                </li>
                            </ul>
                            <div class="flex flex-row">
                                <a class="link ml-auto" :href="article.para?.source" target="_blank">
                                    <button class="btn btn-ghost">
                                        Source
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <article class="article-block break-words flex flex-col max-w-100 p-2"
                         v-html="parseMarkdown(article.content)">
                    </article>
                    <div v-if="status === 'authenticated' && data.id === article.author.id" :class="`card-actions mt-auto flex flex-nowrap flex-col sm:flex-row`">
                        <NuxtLink :to="`/theme/${route.params.id}/article/${route.params.articleId}/edit`" class="w-full flex-none min-w-max">
                            <button class="btn btn-sm btn-outline w-full flex-none">Edit</button>
                        </NuxtLink>
                    </div>
                </div>
            </FetchPlaceholder>
        </div>
    </div>
</template>

<style>
/* purgecss start ignore */

@import "assets/css/article.css";
@import "assets/css/common.css";

/* purgecss end ignore */
</style>