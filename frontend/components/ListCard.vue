<script setup lang="ts">
    import {PropType} from "@vue/runtime-core"

    const props = defineProps({
        content: Object as PropType<CardData[]>,
        header: String
    })

</script>

<template>
    <div class="card bg-base-200 shadow-xl">
        <div class="card-body p-4">
            <h1 class="card-title rounded-lg bg-base-300 p-2">{{ props.header }}</h1>
            <div v-for="theme in props.content" class="flex flex-col">
                <NuxtLink :to="`/${theme.id}`">
                    <div class="ml-4 p-2 bg-base-300 rounded-lg flex flex-row items-center gap-x-4">
                        <div class="badge badge-neutral badge-sm"></div>
                        <h2>
                            {{ theme.title }}
                        </h2>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
