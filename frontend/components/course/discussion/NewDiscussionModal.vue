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

const textRows = useState(() => countRows(initMessage.value.data))

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

    if (res) {
        console.log(title.value.data, initMessage.value.data)
        title.value.data = ""
        title.value.isValid = true

        initMessage.value.data = ""
        initMessage.value.isValid = true

        textRows.value = countRows(initMessage.value.data)
    }
}

</script>

<template>
    <dialog :id="props.id" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box flex flex-col gap-4">
                <div class="flex flex-row">
                    <h3 class="font-bold text-lg mb-4">New discussion</h3>
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
                    <button class="btn btn-accent" @click="createDiscussion()">Create</button>
                </div>
            </div>

        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>

<style scoped>

</style>