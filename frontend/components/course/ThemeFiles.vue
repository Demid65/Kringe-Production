<script setup lang="ts">
    import {routesMap} from "~/utils/routes";

    const props = defineProps(['title', 'files'])

    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
</script>

<template>
    <div class="collapse bg-base-200 collapse-arrow content-stretch sm:content-normal">
        <input type="checkbox" class="min-h-0" />
        <div class="collapse-title min-h-0 p-1">
            <p class="pl-4">{{ capitalizeFirstLetter(props.title) }}</p>
        </div>
        <div class="collapse-content flex flex-col sm:flex-row flex-wrap gap-2 w-full">
            <div v-for="file in props.files" class="w-full sm:w-auto">
                <a :href="`${routesMap['getFile']}?fileId=${file.id}`" :download="`${file.title}.${file.type}`">
                    <button class="btn btn-outline break-all w-0 min-w-full sm:min-w-auto sm:w-auto">
                        {{ file.title }} ({{ file.type }})
                    </button>
                </a>
            </div>
        </div>
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