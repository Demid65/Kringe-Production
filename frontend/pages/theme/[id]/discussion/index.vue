<script setup lang="ts">
import {routesMap} from "~/utils/routes";

const { data: cards, pending, error, refresh } = await useFetch(routesMap['courseDiscussion'], {
    query: {
        data: 'disc'
    }
})
</script>

<template>
    <Head>
        <Title>
            {{ cards.title }} - Discussion
        </Title>
    </Head>
    <div class="flex flex-col container mx-auto px-2 h-full">
        <div class="card bg-base-200 shadow-xl h-full">
            <div class="card-body p-4 gap-0">
                <div class="card-title rounded-lg bg-base-300 p-4">
                    <h1 class="text-2xl">{{ cards.title }} - Discussion</h1>
                </div>
                <div class="flex flex-col gap-2 py-2">
                    <template v-for="topic in cards.topics">
                        <NuxtLink :to="`discussion/${topic.id}`">
                            <div class="card bg-base-300 border border-base-300 hover:border-accent shadow-xl">
                                <div class="card-body p-6">
                                    <h2 class="card-title text-lg">{{ topic.title }}</h2>
                                    <p>by {{ topic.author }}</p>

                                </div>
                            </div>
                        </NuxtLink>
                    </template>
                </div>

<!--                <div class="card-actions mt-auto justify-end">-->
<!--                    <button class="btn btn-sm w-full btn-neutral" :onclick='`window.${uploadModalId}.showModal()`'>Upload Materials</button>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>