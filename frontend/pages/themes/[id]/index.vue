<script setup lang="ts">
import {themeTopics} from "~/types/mocks";
const topics = useState('topics', () => themeTopics)
const title = "sus"
</script>

<template>
    <div class="flex flex-col gap-8 container mx-auto px-2 ">
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body p-4">
                <h1 className="card-title rounded-lg bg-base-300 p-2">{{ title }}</h1>
                <div v-for="topic in topics" class="flex p-2 flex-col">
                    <TreeNode :data="topic"/>
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>