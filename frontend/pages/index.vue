<script setup lang="ts">
import {routesMap} from "~/utils/routes";

const { data: cards, pending, error, refresh } = await useFetch('sus' + routesMap['mainData'], {
    query: {
        data: 'main'
    },
    server: false
})

</script>

<template>
    <Head>
        <Title>
            Kringe
        </Title>
    </Head>

    <div class="flex flex-col gap-8 container h-full mx-auto px-2 ">

        <FetchPlaceholder :pending="pending" :error="error" >
            <ListCard :content="cards.popular" :pending="pending" :error="error" header="Popular" />
            <ListCard :content="cards.new" :pending="pending" :error="error" header="New" />
        </FetchPlaceholder>

    </div>
</template>
