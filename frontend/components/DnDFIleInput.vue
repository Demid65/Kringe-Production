<script setup lang="ts">
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

function handleFilesChange(event) {
    emit('update:modelValue', event.target.files);
}
</script>

<template>
    <div class="mt-4">
        <input type="file"
               @change="handleFilesChange($event)"
               multiple="multiple"
               class="file-input file-input-bordered w-full max-w" />
    </div>
</template>

<style scoped>

</style>