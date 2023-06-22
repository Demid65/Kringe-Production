<script setup lang="ts">
import {popularThemes as ptMock, newThemes as ntMock} from "~/types/mocks";

const popularThemes = useState<CardData[]>("popularThemes", () => ptMock);

const newThemes = useState<CardData[]>("newThemes", () => ntMock)

const { data: cards, pending, error, refresh } = await useFetch('/api/getMain')

</script>

<template>
    <div class="flex flex-col gap-8 container h-full shadow-xl mx-auto px-2 ">

        <FetchPlaceholder :pending="pending" :error="error" >
            <ListCard :content="cards.popular" header="Popular" />
            <ListCard :content="cards.new" header="New" />
        </FetchPlaceholder>

    </div>
</template>
