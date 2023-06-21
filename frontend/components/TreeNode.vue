<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

const props = defineProps({
    data: {
        type: Object as PropType<TreeNode>,
        required: true
    }
})
</script>

<template>
    <div v-if="props.data?.children !== null" className="collapse bg-base-200 collapse-arrow">
        <input type="checkbox" class="min-h-0" />
        <div className="collapse-title min-h-0 p-1">
            <p class="pl-4">{{ props.data.title }}</p>
        </div>
        <div className="collapse-content">
            <div v-for="child in props.data.children">
                <TreeNode :data="child" />
            </div>
        </div>
    </div>
    <div v-else>
        <p class="p-1 pl-4">
            <NuxtLink :to="`/${props.data.title}`">{{ props.data.title }}</NuxtLink>
        </p>
    </div>
</template>

<style scoped>
    .collapse-content {
        padding-bottom: 0;
    }
    .collapse-title:after {
        left: 0
    }
</style>