<script setup lang="ts">
    import {$fetch} from "ofetch";

    const props = defineProps(['title', 'files'])

    function getFile(fileId: string) {
        $fetch('/api/getFile', {
            query: {
                id: fileId
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
</script>

<template>
    <div class="collapse bg-base-200 collapse-arrow">
        <input type="checkbox" class="min-h-0" />
        <div class="collapse-title min-h-0 p-1">
            <p class="pl-4">{{ capitalizeFirstLetter(props.title) }}</p>
        </div>
        <div class="collapse-content">
            <div v-for="file in props.files" class="flex gap-4">
                <button class="btn" @click="getFile(file.id)">
                    {{ file.name }} ({{ file.type }})
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>