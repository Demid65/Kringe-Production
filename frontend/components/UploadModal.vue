<script setup lang="ts">
import {categoriesList} from "~/types/types";

const props = defineProps({
    id: String
})

const categoryValue = useState('categoryValue', () => categoriesList[0])
const files = useState('files', () => null)

</script>

<template>
    <dialog :id="props.id" class="modal modal-bottom sm:modal-middle">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg mb-4">Upload Materials</h3>
            <UploadCategoryRadio v-model="categoryValue" />
            <DnDFIleInput v-model="files" />

            <div class="modal-action">
                <button class="btn btn-neutral" @click="console.log(categoryValue, files)">Upload</button>
            </div>
        </form>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>

<style scoped>

</style>