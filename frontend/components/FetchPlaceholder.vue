<script setup lang="ts">
const props = defineProps([
    'pending',
    'error'
])
</script>

<template>
    <div v-if="pending" class="hero h-full rounded-xl my-auto bg-base-200">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="loading loading-spinner loading-lg"></h1>
                <p class="py-6">Wait (please)</p>
            </div>
        </div>
    </div>
    <div v-else-if="error" class="hero h-full rounded-xl bg-base-200 ">
        <div class="hero-content text-center">
            <div class="max-w-lg">
<!--                <NuxtLink :to="`https://http.cat/${error.data.statusCode}`">-->
<!--                    <h1 class="text-5xl font-bold">{{ error.data.statusCode }}</h1>-->
<!--                </NuxtLink>-->
                <figure><img class="rounded-3xl" :src="`https://http.cat/${error.data.statusCode}`" :alt="error.data.statusCode" /></figure>


                <p class="py-6">{{ error.data.message }}</p>
            </div>
        </div>
    </div>
    <template v-else>
        <slot></slot>
    </template>
</template>

<style scoped>

</style>