<script setup lang="ts">

const props = defineProps(['data', 'isOpen'])
defineEmits(['update:isOpen'])

</script>

<template>
    <div v-if="props.data?.courses" class="collapse bg-base-200 collapse-arrow">
        <input type="checkbox" v-model="props.isOpen" :value="props.isOpen" @input="$emit('update:isOpen', $event.target.value === 'true')" class="min-h-0" />
        <div class="collapse-title min-h-0 p-1">
            <p class="pl-4 text-xl">{{ props.data.title }}</p>
        </div>
        <div class="collapse-content">
            <div v-for="child in props.data.courses">
                <TreeNode :data="child" />
            </div>
        </div>
    </div>
    <div v-else>
        <p class="p-1 pl-4">
            <NuxtLink :to="`/theme/${props.data.title}`" class="text-xl">{{ props.data.title }}</NuxtLink>
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