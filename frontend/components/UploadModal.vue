<script setup lang="ts">
import {categoriesList} from "~/utils/types";
import {routesMap} from "~/utils/routes";
import {$fetch} from "ofetch";

const props = defineProps({
    id: String
})

const route = useRoute()
const categoryValue = useState('categoryValue', () => categoriesList[0])
const files = useState('files', () => [])

function uploadFiles() {
    const id = route.params.id
    const cat = categoryValue.value
    const f = files.value
    console.log(f)

    const fd = new FormData()
    fd.append('id', id)
    fd.append('category', cat)

    for (let i = 0; i < f.length; i++) {
        fd.append('files[]', f[i])
    }

    $fetch(routesMap['uploadFile'], {
        method: 'POST',
        body: fd
    }).catch((err) => {
        console.log(err)
    })

    console.log(fd)
}

</script>

<template>
    <dialog :id="props.id" class="modal modal-bottom sm:modal-middle">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg mb-4">Upload Materials</h3>
            <UploadCategoryRadio v-model="categoryValue" />
            <DnDFIleInput v-model="files" />

            <div class="modal-action">
                <button class="btn btn-neutral" @click="uploadFiles()">Upload</button>
            </div>
        </form>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>

<style scoped>

</style>