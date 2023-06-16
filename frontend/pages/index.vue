<script setup lang="ts">
    const cards = useState<CardData[]>('cards', () => [
      {
        title: "card 1",
        id: "1"
      },
      {
        title: "card 2",
        id: "2"
      },
      {
        title: "card 3",
        id: "3"
      },
    ])

    function idToPath(id: string): string {
      return `/themes/${id}`
    }

    type CardData = {
      title: string,
      id: string
    }
</script>

<template>
  <div v-for="card in cards" class="flex flex-col p-1 container mx-auto">
    <div>
      <NuxtLink :to="idToPath(card.id)">
        <ListCard :title="card.title" :cardId="card.id"/>
      </NuxtLink>
    </div>
  </div>
</template>