<script setup lang="ts">
import {routesMap} from "~/utils/routes";
import {$fetch} from "ofetch";
import {FileCategory} from "@prisma/client";
import {constants} from "os";
import errno = module

const props = defineProps({
    id: String
})

const { status, data } = useAuth()
const route = useRoute()
const categoryValue = useState('categoryValue', () => FileCategory.SHARED)
const file = useState('files', () => null)
const fetchState = useState(() => ({
    pending: false,
    error: false,
    errorMessage: ''
}))


function uploadFiles() {
    if (status.value !== 'authenticated') {
        console.log('What are you doing without account???????????????')
        window[props.id].close()
        return
    }

    const id = route.params.id
    const cat = categoryValue.value
    const f = file.value
    console.log(f)

    const fd = new FormData()
    fd.append('id', id)
    fd.append('category', cat)

    fd.append('file', f[0])

    fetchState.value.pending = true
    fetchState.value.error = false
    fetchState.value.errorMessage = ''

    $fetch(routesMap['uploadFile'], {
        method: 'POST',
        body: fd,
    }).catch((err) => {
        fetchState.value.pending = false
        fetchState.value.error = true
        fetchState.value.errorMessage = err.data.statusMessage
        console.log(err)
    }).then(() => {
        fetchState.value.pending = false
        // window[props.id].close()
    })

    console.log(fd)
}

</script>

<template>
    <dialog :id="props.id" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box flex flex-col">
            <h3 class="font-bold text-lg mb-4">Upload Materials</h3>

            <div v-if="fetchState.error" class="alert alert-error mb-4 flex flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{{ fetchState.errorMessage }}</span>
            </div>

            <UploadCategoryRadio v-model="categoryValue" />
            <DnDFIleInput v-model="file" />

            <div class="modal-action">
                <button class="btn btn-accent" @click="uploadFiles()">
                    <span v-if="fetchState.pending" class="loading loading-spinner loading-lg"></span>
                    <span v-else>Upload</span>
                </button>
            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>

<style scoped>

</style>