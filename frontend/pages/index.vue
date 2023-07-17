<script setup lang="ts">
import {routesMap} from "~/utils/routes";

const { data: mainData, pending, error, refresh } = await useFetch(routesMap['mainData'], {
    query: {
        data: 'main'
    }
})

</script>

<template>
    <Head>
        <Title>
            UniHub
        </Title>
    </Head>

    <div class="flex flex-col gap-4 container h-full mx-auto px-2  h-0 min-h-full overflow-y-auto scrollbar">



        <div v-if="mainData.featuredArticle" class="card bg-base-200">
            <div class="card-body p-4">
                <h1 class="card-title rounded-lg bg-base-300 p-2">Featured Article</h1>
                <NuxtLink :to="`/theme/${mainData.featuredArticle.course.id}/article/${mainData.featuredArticle.id}`">
                    <div class="card bg-base-300 border border-base-300 break-words hover:border-accent w-0 min-w-full">
                        <div class="card-body p-6">
                            <h2 class="card-title text-lg break-all w-0 min-w-full">{{ mainData.featuredArticle.title }}</h2>
                            <p>by {{ mainData.featuredArticle.author.username }} in {{ mainData.featuredArticle.course.title }}</p>

                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <FetchPlaceholder :pending="pending" :error="error" >
            <ListCard :content="mainData.popular" :pending="pending" :error="error" header="Popular" />
            <ListCard :content="mainData.new" :pending="pending" :error="error" header="New" />
        </FetchPlaceholder>

    </div>
</template>
