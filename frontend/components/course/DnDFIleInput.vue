<script setup lang="ts">
const props = defineProps(['error', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

function handleFilesChange(event) {
    emit('update:modelValue', event.target.files);
}
</script>

<template>
    <div class="mt-4">
        <input type="file"
               @change="handleFilesChange($event)"
               :class="`file-input file-input-bordered w-full max-w ${props.error ? 'file-input-error' : ''} `" />
    </div>
</template>

<style scoped>

</style>