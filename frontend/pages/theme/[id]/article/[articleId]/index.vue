<script setup lang="ts">
    import {routesMap} from "~/utils/routes";
    import {useMarkdown} from "~/utils/useMarkdown";

    const colorMode = useColorMode()
    const route = useRoute()
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
    <div class="flex flex-col container mx-auto px-2 h-full">
        <div class="card bg-base-200 shadow-xl h-full w-0 min-w-full">
            <FetchPlaceholder :pending="pending" :error="error">
                <div class="card-body p-4 gap-0">
                    <div class="card-title rounded-lg bg-base-300 p-4 mb-2">
                        <h1 class="text-lg break-words">{{ article.title }}</h1>
                        <NuxtLink :to="`/theme/${$route.params.id}/`" class="ml-auto flex-none min-w-max">
                            <button class="btn btn-sm btn-outline flex-none">Go back</button>
                        </NuxtLink>
                    </div>
                    <div v-if="article.para" class="collapse collapse-arrow bg-base-300">
                        <input type="checkbox" />
                        <div class="collapse-title text-xl font-medium">
                            Click me to show/hide content
                        </div>
                        <div class="collapse-content">
                            <ul class="list-disc pl-4">
                                <li v-for="point in article.para">
                                    {{ point }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <article class="article-block break-words flex flex-col max-w-100 p-2"
                         v-html="parseMarkdown(article.content)">
                    </article>
                </div>
            </FetchPlaceholder>
        </div>
    </div>
</template>

<style>
/* purgecss start ignore */

@import "assets/css";

/* purgecss end ignore */
</style>