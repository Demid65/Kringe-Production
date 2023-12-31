<script setup lang="ts">
import {routesMap} from "~/utils/routes";

const { status, data } = useAuth()
const route = useRoute()

const { data: cards, pending, error, refresh } = await useFetch(routesMap['courseDiscussion'], {
    query: {
        courseId: route.params.id
    }
})

const newDiscussionModalId = 'new_discussion_modal'
</script>

<template>
    <Head>
        <Title>
            {{ cards.title }} - Discussion
        </Title>
    </Head>
    <NewDiscussionModal :id="newDiscussionModalId" :refresh="refresh" />
    <div class="flex flex-col container mx-auto px-2 h-full">
        <div class="card bg-base-200 w-0 min-w-full h-0 min-h-full overflow-y-auto scrollbar">
            <div class="card-body p-4 gap-0">
                <div class="card-title rounded-lg bg-base-300 p-4">
                    <h1 class="text-2xl">{{ cards.title }} - Discussion</h1>
                    <div class="ml-auto flex flex-row gap-2">
                        <NuxtLink :to="`/theme/${$route.params.id}`" class="flex-none">
                            <button class="btn btn-sm btn-outline flex-none">Go back</button>
                        </NuxtLink>
                    </div>
                </div>
                <div class="flex flex-col gap-2 py-2">
                    <template v-for="topic in cards.topics">
                        <NuxtLink :to="`/theme/${route.params.id}/discussion/${topic.id}`">
                            <div class="card bg-base-300 border border-base-300 break-words hover:border-accent w-0 min-w-full">
                                <div class="card-body p-6">
                                    <h2 class="card-title break-all text-lg w-0 min-w-full">{{ topic.title }}</h2>
                                    <p>by {{ topic.author.username }}</p>

                                </div>
                            </div>
                        </NuxtLink>
                    </template>
                </div>
                <div
                    :class="`card-actions mt-auto flex flex-nowrap flex-col sm:flex-row ${status !== 'authenticated' ? 'tooltip tooltip-top' : '' }`"
                    :data-tip="status !== 'authenticated' ? 'Log in to use it' : ''"
                >
                    <button
                        :class="`btn btn-sm w-full shrink btn-outline ${status !== 'authenticated' ? 'btn-disabled' : '' }`"
                        :onclick="`window.${newDiscussionModalId}.showModal()`"
                    >New</button>
                </div>
                <div :class="`${status !== 'authenticated' ? 'tooltip tooltip-top' : '' }`" :data-tip="status !== 'authenticated' ? 'Log in to use it' : ''">

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "assets/css/common.css";
</style>