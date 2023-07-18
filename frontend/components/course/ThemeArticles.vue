<script setup lang="ts">

const props = defineProps(['title', 'articles'])

const route = useRoute()

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<template>
    <div class="collapse bg-base-200 collapse-arrow content-stretch">
        <input type="checkbox" class="min-h-0" checked/>
        <div class="collapse-title min-h-0 p-1">
            <p class="pl-4">{{ capitalizeFirstLetter(props.title) }}</p>
        </div>
        <div class="collapse-content flex flex-col gap-2 w-full px-0">
            <div v-for="article in props.articles" class="sm:w-full">
<!--                <NuxtLink :to="`/theme/${route.params.id}/article/${article.id}`">-->
<!--                    <button class="btn btn-outline break-all w-0 min-w-full">-->
<!--                        {{ article.title }} (by {{ article.author.username}})-->
<!--                    </button>-->
<!--                </NuxtLink>-->
                <NuxtLink :to="`/theme/${route.params.id}/article/${article.id}`">
                    <div class="card bg-base-300 border border-base-300 break-words hover:border-accent w-0 min-w-full">
                        <div class="card-body p-6">
                            <h2 class="card-title text-lg break-all w-0 min-w-full">{{ article.title }}</h2>
                            <p>by {{ article.author.username }}</p>

                        </div>
                    </div>
                </NuxtLink>
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