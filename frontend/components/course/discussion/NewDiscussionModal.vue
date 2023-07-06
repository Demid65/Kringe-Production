<script setup lang="ts">
import {categoriesList, loginModes} from "~/utils/types";
import {routesMap} from "~/utils/routes";
import {$fetch} from "ofetch";

const props = defineProps({
    id: String
})

const route = useRoute()
const title = useState('newDiscussionTitle', () => ({
    data: "",
    isValid: true
}))
const initMessage = useState('newDiscussionInitMessage', () => ({
    data: "",
    isValid: true
}))
const fetchState = useState(() => ({
    pending: false,
    error: false,
    errorMessage: ''
}))

const textRows = useState(() => countRows(initMessage.value.data))

const { status, data } = useAuth()


function countRows(text: string) {
    let rows = text.split(/\r\n|\r|\n/).length
    console.log(rows)
    return rows
}

function validateInput() {
    title.value.isValid = true
    initMessage.value.isValid = true

    if(title.value.data.length < 3) {
        title.value.isValid = false
        return false
    }
    if(initMessage.value.data.length < 3) {
        initMessage.value.isValid = false
        return false
    }

    return true
}

function createDiscussion() {

    const res = validateInput()

    console.log(status.value, data.value.user)

    if (status.value !== 'authenticated') {
        console.log('What are you doing without account???????????????')
        window[props.id].close()
        return
    }

    if (res) {
        console.log({
            user: data.value.id,
            courseId: route.params.id,
            title: title.value.data,
            initMessage: initMessage.value.data
        })

        $fetch(routesMap['createDiscussion'], {
            method: 'POST',
            body: {
                title: title.value.data,
                courseId: route.params.id,
                message: initMessage.value.data
            }
        }).then((val) => {
            fetchState.value.pending = false
            window[props.id].close()

            title.value.data = ""
            title.value.isValid = true

            initMessage.value.data = ""
            initMessage.value.isValid = true

            textRows.value = countRows(initMessage.value.data)
        }, (err) => {
            fetchState.value.pending = false
            fetchState.value.error = true
            fetchState.value.errorMessage = err.data.statusMessage
            console.log(err)
        })

        console.log(title.value.data, initMessage.value.data)

    }
}

</script>

<template>
    <dialog :id="props.id" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box flex flex-col gap-4">
                <div class="flex flex-row">
                    <h3 class="font-bold text-lg mb-4">New discussion</h3>
                </div>

                <div v-if="fetchState.error" class="alert alert-error mb-4 flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{{ fetchState.errorMessage }}</span>
                </div>

                <div>
                    <input type="text" :class="`input w-full bg-base-300 ${title.isValid ? '' : 'input-error'}`" name="username" v-model="title.data" placeholder="Discussion title">
                    <label v-if="!title.isValid" class="label p-0 mt-1">
                        <span class="label-text text-error">3+ chars</span>
                    </label>
                </div>
                <div>
                    <textarea
                        :class="`textarea w-full bg-base-300 resize-none ${initMessage.isValid ? '' : 'textarea-error'}`"
                        v-model="initMessage.data"
                        placeholder="Your message"
                        :rows="textRows"
                        @input="() => {textRows = countRows(initMessage.data)}"
                    ></textarea>
                    <label v-if="!initMessage.isValid" class="label p-0 mt-1">
                        <span class="label-text text-error">3+ chars</span>
                    </label>
                </div>

                <div class="modal-action">
                    <button class="btn btn-accent" @click="createDiscussion()">
                        <span v-if="fetchState.pending" class="loading loading-spinner loading-lg"></span>
                        <span v-else>Create</span>
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