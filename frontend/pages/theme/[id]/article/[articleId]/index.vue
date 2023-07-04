<script setup lang="ts">
    import {routesMap} from "~/utils/routes";
    import MarkdownIt from "markdown-it";
    import DOMPurify from "dompurify";
    import {$fetch} from "ofetch";

    const route = useRoute()

    // const { data: article, pending, error, refresh } = await useFetch(routesMap['getArticle'], {
    //     query: {
    //         data: 'article'
    //     },
    //     server: false,
    //     lazy: true
    // })

    const { data: article, pending, error, refresh } = await useAsyncData(async () => {
        const articleData = await $fetch(routesMap['getArticle'], {
            query: {
                data: 'article'
            }
        })
        console.log(articleData)
        const articleContent = await $fetch(`/${articleData.name}`)

        console.log(typeof articleContent)

        return {
            title: articleData.title,
            content: articleContent
        }
    }, {
        server: false,
        lazy: true
    })

    console.log(article)

    function parseMarkdown(content: any) {
        console.log(content, typeof content)
        const md = new MarkdownIt({
            html: true
        })
        return DOMPurify.sanitize(md.render(content))

    }
</script>

<template>
    <Head>
        <Title>
            {{ article?.title ? article.title : 'Wait' }}
        </Title>
    </Head>
    <div class="flex flex-col container mx-auto px-2 h-full">
        <div class="card bg-base-200 shadow-xl h-full">
            <FetchPlaceholder :pending="pending" :error="error">
                <div class="card-body p-4 gap-0">
                    <div class="card-title rounded-lg bg-base-300 p-4">
                        <h1 class="text-lg">{{ article.title }}</h1>
                        <NuxtLink :to="`${$route.params.id}/`" class="ml-auto">
                            <button class="btn btn-sm btn-neutral">Go back</button>
                        </NuxtLink>
                    </div>
                    <div class="article-block break-words flex flex-col max-w-100 p-2" v-html="parseMarkdown(article.content)">

                    </div>
                </div>

<!--                <div class="collapse collapse-arrow bg-base-300 w-full">-->
<!--                    <input type="checkbox" />-->
<!--                    <div class="collapse-title text-lg font-medium">-->
<!--                        Write-->
<!--                    </div>-->
<!--                    <div class="collapse-content">-->
<!--                        <textarea-->
<!--                            class="textarea textarea-accent resize-none w-full"-->
<!--                            :rows="10"-->
<!--                            @input=""-->
<!--                            v-model="article.content"-->
<!--                            placeholder="Your message" />-->
<!--                    </div>-->
<!--                </div>-->
            </FetchPlaceholder>
        </div>
    </div>
</template>

<style>
/* purgecss start ignore */
.article-block {
    h1 {
        @apply mt-4 text-3xl;
    }

    h2 {
        @apply mt-2 text-2xl;
    }

    h3 {
        @apply mt-2 text-xl;
    }
    h4, h5, h6 {
        @apply mt-2 text-lg;
    }

    code {
        @apply bg-base-100 rounded p-1;
    }

    pre {
        @apply bg-base-100 p-2 rounded-lg my-2;
        code {
            @apply p-0;
        }
    }

    ul {
        @apply list-disc ml-6;
    }

    ol {
        @apply list-decimal ml-6;
    }

    blockquote {
        @apply bg-base-100 p-4 rounded-lg;
    }

    a {
        @apply link;
    }

    p {
        @apply my-1;
    }

    img {
        @apply rounded-lg;
    }

}
/* purgecss end ignore */
</style>