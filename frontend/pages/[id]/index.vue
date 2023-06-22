<script setup lang="ts">
import {themeTopics} from "~/types/mocks";

const topics = useState('topics', () => themeTopics)

const title: string = "sus"
const uploadModalId = 'upload_modal'
const uploadModal = document.getElementById(uploadModalId)
</script>

<template>
    <UploadModal :id="uploadModalId"/>
    <div class="flex flex-col container mx-auto px-2 h-full">
        <div class="card bg-base-200 shadow-xl h-full">
            <div class="card-body p-4 gap-0">
                <div class="card-title rounded-lg bg-base-300 p-4">
                    <h1 class="text-2xl">{{ title }}</h1>
                    <button class="btn btn-sm btn-neutral ml-auto">Discussion</button>
                </div>
                <div v-for="topic in topics" class="flex p-2 flex-col">
                    <TreeNode :data="topic"/>
                </div>
                <div class="card-actions mt-auto justify-end">
                    <button class="btn btn-sm btn-neutral" onclick='window.upload_modal.showModal()'>Upload Materials</button>
                </div>
            </div>
        </div>
    </div>
</template>