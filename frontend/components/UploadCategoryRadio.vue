<script setup lang="ts">
import {categoriesList} from "~/types/types";

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const value = useState('value', () => categoriesList[0])
const categories = categoriesList
const radioName = 'category_radio'

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<template>
    <div v-for="category in categories">
        <div class="form-control">
            <label class="label cursor-pointer justify-start gap-4">
                <input type="radio"
                       v-model="value"
                       :value="category"
                       @input="$emit('update:modelValue', $event.target.value)"
                       :name="radioName"
                       class="radio" />
                <span class="label-text">{{ capitalizeFirstLetter(category) }}</span>
            </label>
        </div>
    </div>
</template>

<style scoped>

</style>