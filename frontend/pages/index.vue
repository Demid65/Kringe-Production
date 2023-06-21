<script setup lang="ts">
import {popularThemes as ptMock, newThemes as ntMock} from "~/types/mocks";

const popularThemes = useState<CardData[]>("popularThemes", () => ptMock);

const newThemes = useState<CardData[]>("newThemes", () => ntMock)

</script>

<template>
    <div class="flex flex-col gap-8 container mx-auto px-2 ">
        <ListCard :content="popularThemes" header="Popular" />
        <ListCard :content="newThemes" header="New" />
    </div>
</template>
