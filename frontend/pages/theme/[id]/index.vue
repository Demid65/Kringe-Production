<script setup lang="ts">
import {routesMap} from "~/utils/routes";
import {FileCategory} from "@prisma/client";

const route = useRoute()
const { status, data } = useAuth()

const { data: cards, pending, error, refresh } = await useFetch(routesMap['courseData'], {
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
    <UploadModal :id="uploadModalId"/>
    <div class="flex flex-col container mx-auto px-2 h-full">
        <div class="card bg-base-200 shadow-xl h-full">
            <div class="card-body p-4 gap-0">
                <div class="card-title rounded-lg bg-base-300 p-4">
                    <h1 class="text-2xl">{{ cards.title }}</h1>
                    <NuxtLink :to="`${$route.params.id}/discussion`" class="ml-auto">
                        <button class="btn btn-sm btn-neutral">Discussion</button>
                    </NuxtLink>
                </div>
                <div v-for="category in Object.values(FileCategory)" class="flex p-2 flex-col">
                    <ThemeCard :title="category" :files="cards.files.filter((el) => el.category === category)"/>
                </div>
                <div
                    :class="`card-actions mt-auto ${status !== 'authenticated' ? 'tooltip tooltip-top' : '' }`"
                    :data-tip="status !== 'authenticated' ? 'Log in to use it' : ''"
                >
                    <button
                        :class="`btn btn-sm w-full btn-neutral ${status !== 'authenticated' ? 'btn-disabled' : '' }`"
                        :onclick='`window.${uploadModalId}.showModal()`'>Upload Materials</button>
                </div>
            </div>
        </div>
    </div>
</template>