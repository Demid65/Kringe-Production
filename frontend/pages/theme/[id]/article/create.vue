<script setup lang="ts">
import {routesMap} from "~/utils/routes";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";
import {$fetch} from "ofetch";
import {debounce} from "~/utils/debounce";

const route = useRoute()
const {status, data} = useAuth()

if (status.value !== 'authenticated') {
    navigateTo('/')
}

const article = useState(() => ({
    title: "",
    content: "",
    isTitleValid: true,
    isContentValid: true
}))
const proxyContent = useState(() => ({
    title: "",
    content: ""
}))

const isWarningVisible = useState(() => true)
const fetchState = useState(() => ({
    pending: false,
    error: false,
    errorMessage: ''
}))

function parseMarkdown(content: any) {
    console.log(content, typeof content)
    const md = new MarkdownIt({
        html: true
    })
    return DOMPurify.sanitize(md.render(content))

}

function update() {
    article.value.content = proxyContent.value.content
    article.value.title = proxyContent.value.title
}

const debouncedUpdate = debounce(update, 300)

function validateInput() {
    article.value.isContentValid = true
    article.value.isTitleValid = true

    if(article.value.title.length < 10) {
        article.value.isTitleValid = false
        return false
    }
    if(article.value.content.length < 100) {
        article.value.isContentValid = false
        return false
    }

    return true
}

function publishArticle() {
    update()
    fetchState.value.pending = true

    const res = validateInput()

    if (!res) {
        return
    }

    $fetch(routesMap['uploadArticle'], {
        method: 'POST',
        body: {
            courseId: route.params.id,
            title: article.value.title,
            content: article.value.content
        }
    }).then((val) => {
        fetchState.value.pending = false
        navigateTo(val)
    }, (err) => {
        fetchState.value.pending = false
        fetchState.value.error = true
        fetchState.value.errorMessage = err.data.statusMessage
        console.log(err)
    })
}
</script>

<template>
    <Head>
        <Title>
            New article
        </Title>
    </Head>
    <div class="flex flex-col container mx-auto px-2 h-full">
        <div class="card bg-base-200 shadow-xl h-full w-0 min-w-full">
            <div class="card-body p-4 gap-0">
                <div v-if="isWarningVisible" class="alert border-accent sm:hidden flex flex-row mb-2">
                    <span>Consider switching to a desktop version</span>
                    <div>
                        <button class="btn btn-sm btn-accent" @click="() => isWarningVisible = false">IDC</button>
                    </div>
                </div>
                <div class="card-title rounded-lg bg-base-300 p-4">
                    <h1 class="text-lg break-all">{{ article.title.length > 0 ? article.title : 'Title will be here' }}</h1>
                    <NuxtLink :to="`/theme/${$route.params.id}`" class="ml-auto">
                        <button class="btn btn-sm btn-outline">Go back</button>
                    </NuxtLink>
                </div>
                <div v-if="article.content.length === 0" class="hero my-auto">
                    <div class="hero-content text-center">
                        <div class="max-w-md">
                            <h1 class="text-xl font-bold opacity-50">Article preview will be here</h1>
                        </div>
                    </div>
                </div>
                <ClientOnly>
                    <div class="article-block break-words flex flex-col max-w-100 p-2"
                         v-html="parseMarkdown(article.content)">
                    </div>
                </ClientOnly>
            </div>

            <div class="collapse collapse-arrow bg-base-300 w-full">
                <input type="checkbox"/>
                <div class="collapse-title text-lg font-medium">
                    Write
                </div>

                <div v-if="fetchState.error" class="alert alert-error mb-4 flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{{ fetchState.errorMessage }}</span>
                </div>

                <div class="collapse-content flex flex-col gap-2">
                    <div>
                        <input class="input input-accent w-full"
                               placeholder="Title"
                               @input="($event) => {
                                proxyContent.title = $event.target.value
                                debouncedUpdate()
                            }"
                               :value="proxyContent.title">
                        <label v-if="!article.isTitleValid" class="label p-0 mt-1">
                            <span class="label-text text-error">10+ chars</span>
                        </label>
                    </div>


                    <div>
                        <textarea
                            class="textarea textarea-accent resize-none w-full"
                            :rows="10"
                            :value="proxyContent.content"
                            @input="($event) => {
                                proxyContent.content = $event.target.value
                                debouncedUpdate()
                            }"
                            placeholder="Content"></textarea>
                        <label v-if="!article.isContentValid" class="label p-0 mt-1">
                            <span class="label-text text-error">100+ chars</span>
                        </label>
                    </div>

                    <div class="flex flex-row justify-end">
                        <button @click="publishArticle()" class="btn btn-sm btn-accent">Publish</button>
                    </div>
                </div>
            </div>
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