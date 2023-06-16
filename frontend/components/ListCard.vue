<script setup lang="ts">
    const props = defineProps({
        title: String,
        cardId: String
    })
</script>

<template>
    <div class="card card-side bg-base-200 join-item">
        <div class="card-body">
            <h2 class="card-title">
                {{ props.title }}
            </h2>
            <p>
                {{ props.cardId }}
            </p>
        </div>
    </div>
</template>