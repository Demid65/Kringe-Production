<script setup lang="ts">
import {routesMap} from "~/utils/routes";

import {FileCategoryTypes} from "~/utils/fileCategoryTypes";
import ThemeFiles from "~/components/course/ThemeFiles.vue";
import ThemeArticles from "~/components/course/ThemeArticles.vue";

const route = useRoute()
const {status, data} = useAuth()

const {data: cards, pending, error, refresh} = await useFetch(routesMap['courseData'], {
    query: {
        courseId: route.params.id
    }
})

const uploadModalId = 'upload_modal'
</script>

<template>
    <Head>
        <Title>
            {{ cards.title }}
        </Title>
    </Head>
    <UploadModal :id="uploadModalId" :refresh="refresh"/>
    <div class="flex flex-col container mx-auto px-2 h-0 min-h-full">
        <div class="card bg-base-200 h-full w-0 min-w-full">
            <div class="card-body p-4 gap-0 h-0 min-h-full overflow-y-auto scrollbar">
                <div class="card-title rounded-lg bg-base-300 p-4">
                    <h1 class="text-2xl break-all">{{ cards.title }}</h1>
                    <NuxtLink :to="`/theme/${$route.params.id}/discussion`" class="ml-auto">
                        <button class="btn btn-sm btn-outline">Discussion</button>
                    </NuxtLink>
                </div>
                <template v-for="category in Object.values(FileCategoryTypes)">
                    <ThemeFiles :title="category" :files="cards.files.filter((el) => el.category === category)"/>
                </template>
                <div class="flex p-2 flex-col">
                  <ThemeArticles :title="`ARTICLES`" :articles="cards.articles"/>
                </div>
                <div
                    :class="`card-actions mt-auto flex flex-nowrap flex-col sm:flex-row ${status !== 'authenticated' ? 'tooltip tooltip-top' : '' }`"
                    :data-tip="status !== 'authenticated' ? 'Log in to use it' : ''"
                >
                    <NuxtLink :to="`/theme/${$route.params.id}/article/create`" class="w-full block shrink">
                        <button
                            :class="`btn btn-sm w-full btn-outline ${status !== 'authenticated' ? 'btn-disabled' : '' }`">
                            Create article
                        </button>
                    </NuxtLink>
                    <button
                        :class="`btn btn-sm shrink w-full btn-outline hover:border-accent hover:bg-accent ${status !== 'authenticated' ? 'btn-disabled' : '' }`"
                        :onclick='`window.${uploadModalId}.showModal()`'>
                        Upload Materials
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>