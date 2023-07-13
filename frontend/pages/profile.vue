<script setup lang="ts">
import {routesMap} from "~/utils/routes";
import {$fetch} from "ofetch";
import {debounce} from "~/utils/debounce";

const route = useRoute()
const {status, data} = useAuth()

console.log(data.value)

if (status.value !== 'authenticated') {
    navigateTo('/')
}

const manageCategories = [
    'USERS',
    'ARTICLES',
    'FILES'
]

const {data: adminData, pending, error, refresh} = await useFetch(routesMap['profile'], {
    query: {
        userId: data.value.id
    }
})

const category = useState(() => manageCategories[1])
const searchString = useState(() => ({
    search: '',
    proxy: ''
}))

function deleteArticle(id) {
    $fetch(routesMap['deleteArticle'], {
        method: 'DELETE',
        query: {
            articleId: id
        }
    }).then((val) => {
        console.log(`deleted ${val}`)
        refresh()
    }, (err) => {
        console.log(err.data)
    })
}

function search() {
    searchString.value.search = searchString.value.proxy.toLowerCase()
}

const debouncedSearch = debounce(search, 300)

</script>

<template>
    <Head>
        <Title>
            {{ data.username ? data.username : 'User' }}
        </Title>
    </Head>
    <div class="flex flex-col container mx-auto px-2 h-0 min-h-full">
        <div class="card bg-base-200 h-full w-0 min-w-full">
            <div class="card-body p-4 gap-0 h-0 min-h-full overflow-y-auto scrollbar">
                <div class="card-title rounded-lg bg-base-300 p-4">
                    <h1 class="text-2xl break-all">{{ data.username ? data.username : 'User' }} - Profile</h1>
                </div>
                <div class="join justify-center my-2">
                    <button v-for="_category in manageCategories"
                            :class="`join-item btn ${category === _category ? 'btn-accent' : ''}`"
                            @click="category = _category"
                    >{{ _category }}</button>
                </div>
                <template v-if="category === 'USERS'">
                    <div class="hero min-h-full bg-base-200">
                        <div class="hero-content text-center">
                            <div class="max-w-md">
                                <h1 class="text-5xl font-bold">There will be tools for users</h1>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="category === 'ARTICLES'">
                    <input type="text" class="input bg-base-300 my-2 border border-accent flex-none" @input="debouncedSearch()" v-model="searchString.proxy" placeholder="search...">

                    <div class="flex flex-col gap-2 h-0 min-h-full">
                        <template v-for="article in adminData.articles.filter((el) => el.title.toLowerCase().includes(searchString.search))">
                            <div class="card bg-base-300 border border-base-300 break-words hover:border-accent w-0 min-w-full">
                                <div class="card-body p-6">
                                    <h2 class="card-title text-lg break-all w-0 min-w-full">{{ article.title }}</h2>
                                    <p>by {{ article.author.username }}</p>
                                    <div class="card-actions justify-end">
                                        <NuxtLink :to="`/theme/${article.courseId}/article/${article.id}`">
                                            <button class="btn btn-sm btn-outline">Open</button>
                                        </NuxtLink>
                                        <NuxtLink :to="`/theme/${article.courseId}/article/${article.id}/edit`">
                                            <button class="btn btn-sm btn-accent">Edit</button>
                                        </NuxtLink>
                                        <button class="btn btn-sm btn-error" @click="deleteArticle(article.id)">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-if="adminData.articles.length === 0">
                            <div class="hero min-h-full bg-base-200">
                                <div class="hero-content text-center">
                                    <div class="max-w-md">
                                        <h1 class="text-5xl font-bold">No articles</h1>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>

                <template v-if="category === 'FILES'">
                    <div class="hero min-h-full bg-base-200">
                        <div class="hero-content text-center">
                            <div class="max-w-md">
                                <h1 class="text-5xl font-bold">There will be tools for files</h1>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "assets/css/common.css";
</style>