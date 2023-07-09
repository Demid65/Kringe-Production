<script setup lang="ts">
    import {PropType} from "@vue/runtime-core"

    const props = defineProps([
        'content',
        'header',
        'pending',
        'error'
    ])

</script>

<template>
    <div class="card bg-base-200 shadow-xl">
        <div class="card-body p-4">
            <h1 class="card-title rounded-lg bg-base-300 p-2">{{ props.header }}</h1>
            <h1 v-if="props.pending">Fetching...</h1>
            <h1 v-else-if="props.error">Error</h1>
            <template v-else>
                <div v-for="theme in props.content" class="flex flex-col">
                    <NuxtLink :to="`/theme/${theme.id}`">
                        <div class="ml-4 p-2 bg-base-300 border border-base-300 rounded-lg flex flex-row hover:border-accent items-center gap-x-4">
                            <div class="badge badge-accent badge-sm"></div>
                            <h2>
                                {{ theme.title }}
                            </h2>
                        </div>
                    </NuxtLink>
                </div>
            </template>
        </div>
    </div>
</template>
