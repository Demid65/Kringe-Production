<script setup lang="ts">


const { data: cards, pending, error, refresh } = await useFetch('/api/mocks', {
    query: {
        data: 'main'
    }
})

</script>

<template>
    <div class="flex flex-col gap-8 container h-full mx-auto px-2 ">

        <FetchPlaceholder :pending="pending" :error="error" >
            <ListCard :content="cards.popular" :pending="pending" :error="error" header="Popular" />
            <ListCard :content="cards.new" :pending="pending" :error="error" header="New" />
        </FetchPlaceholder>

    </div>
</template>
