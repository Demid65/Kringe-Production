<script setup lang="ts">
import {routesMap} from "~/utils/routes";
import {$fetch} from "ofetch";
import {sleep} from "@antfu/utils";

const {status, data} = useAuth()
const route = useRoute()

const {data: topic, pending, error, refresh} = await useFetch(routesMap['discussionMessages'], {
    query: {
        themeId: route.params.discTopicId
    },
    server: false,
    lazy: true
})

const messageInput = useState('message_input', () => ({
    data: "",
    isValid: true,
    editTarget: null
}))
const reply = useState(() => null)
const textRows = useState(() => 1)
const updateInterval = useState(() => null)
const fetchState = useState(() => ({
    pending: false,
    error: false,
    errorMessage: ''
}))

function countRows() {

    const input = document.getElementById('message_input')

    if (input.scrollHeight > input.clientHeight) {
        input.style.height = `${input.scrollHeight}px`
    } else {
        input.style.height = null;
    }
}

function getPlaceholder(name: string) {
    return name.slice(0, 3).toUpperCase()
}

function validateInput() {
    messageInput.value.isValid = true

    if (messageInput.value.data.length < 2) {
        messageInput.value.isValid = false
        return false
    }

    if (messageInput.value.editTarget !== null && messageInput.value.editTarget.content === messageInput.value.data) {
        messageInput.value.isValid = false
        return false
    }

    return true
}

function sendMessage() {

    const res = validateInput()

    if (status.value !== 'authenticated') {
        console.log('What are you doing without account???????????????')
        return
    }

    if (!res) {
        return
    }

    $fetch(routesMap['createMessage'], {
        method: 'PUT',
        body: {
            themeId: route.params.discTopicId,
            message: messageInput.value.data,
            replyId: reply.value?.id
        }
    }).then((val) => {
        fetchState.value.pending = false

        messageInput.value.data = ""
        messageInput.value.isValid = true
        reply.value = null

        countRows()

        updateMessages()
    }, (err) => {
        fetchState.value.pending = false
        fetchState.value.error = true
        fetchState.value.errorMessage = err.data.statusMessage
        console.log(err)

        updateMessages()
    })
}

function saveEditedMessage() {

    const res = validateInput()

    if (status.value !== 'authenticated') {
        console.log('What are you doing without account???????????????')
        return
    }

    if (!res) {
        return
    }

    $fetch(routesMap['editMessage'], {
        method: 'PUT',
        body: {
            messageId: messageInput.value.editTarget.id,
            message: messageInput.value.data,
        }
    }).then((val) => {
        fetchState.value.pending = false

        messageInput.value.data = ""
        messageInput.value.isValid = true
        messageInput.value.editTarget = null

        countRows()

        updateMessages()
    }, (err) => {
        fetchState.value.pending = false
        fetchState.value.error = true
        fetchState.value.errorMessage = err.data.statusMessage
        console.log(err)

        updateMessages()
    })
}

async function setReply(id) {
    const message = topic.value.messages.find(message => message.id === id)

    if (message) {
        reply.value = message

        document.querySelector('#message_input_checkbox').checked = true
        await sleep(300)
        document.querySelector('#message_input').focus()
        document.querySelector('#message_submit').scrollIntoView({behavior: "smooth", block: "center", inline: "start"})
    }
}

async function editMessage(id) {
    const message = topic.value.messages.find(message => message.id === id)

    if (message) {
        messageInput.value.data = message.content
        messageInput.value.editTarget = message

        reply.value = null

        document.querySelector('#message_input_checkbox').checked = true
        await sleep(300)
        document.querySelector('#message_input').focus()
        document.querySelector('#message_submit').scrollIntoView({behavior: "smooth", block: "center", inline: "start"})
    }
}

function updateMessages() {
    $fetch(routesMap['discussionMessages'], {
        query: {
            themeId: route.params.discTopicId
        }
    }).then((val) => {
        topic.value = val
    }, (err) => {
        console.log(err)
    })
}

onMounted(() => {

    updateInterval.value = setInterval(updateMessages, 1000)
})
onUnmounted(() => {
    if (updateInterval.value !== null) {
        clearInterval(updateInterval.value)
    }
})
</script>

<template>
    <Head>
        <Title>
            {{ topic?.title ? topic.title : 'Wait' }}
        </Title>
    </Head>
    <div class="flex flex-col container mx-auto px-2 h-full">
        <div class="card bg-base-200 h-full w-0 min-w-full">
            <div class="card-body p-4 gap-0">
                <FetchPlaceholder :pending="pending" :error="error">
                    <div class="card-title rounded-lg bg-base-300 p-4">
                        <h1 class="text-lg break-all">{{ topic.title }}</h1>
                        <NuxtLink :to="`/theme/${$route.params.id}/discussion`" class="ml-auto flex-none min-w-max">
                            <button class="btn btn-sm btn-outline flex-none">Go back</button>
                        </NuxtLink>
                    </div>
                    <div class="flex flex-col gap-6 py-2">

                        <template v-for="message in topic.messages">
                            <div v-if="message.author.id === data?.id" class="chat chat-end flex flex-row-reverse">
                                <div class="chat-image avatar placeholder">
                                    <div class="w-10 rounded-full bg-base-300 ring ring-accent">
                                        <span>{{ getPlaceholder(message.author.username) }}</span>
                                    </div>
                                </div>

                                <div class="chat-bubble break-words">
                                    <div class="text text-left mb-1 flex flex-row">
                                        <span class="text-accent">
                                            {{ message.author.username }}
                                        </span>
                                    </div>
                                    <div v-if="message.replyTarget" class="card w-full border border-accent p-0 my-2">
                                        <div class="card-body p-4">
                                            <div class="flex flex-col sm:flex-row">
                                                <div>
                                                    <div class="text text-accent mb-1">
                                                        {{ message.replyTarget.author.username }}
                                                    </div>
                                                    <span>
                                                        {{ message.replyTarget.content }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span>
                                        {{ message.content }}
                                    </span>
                                    <span v-if="message.edited">
                                        edited
                                    </span>
                                </div>

                                <button v-if="status === 'authenticated'"
                                        class="btn btn-ghost self-center btn-square btn-sm"
                                        @click="editMessage(message.id)">
                                    <svg class="w-5 stroke-current" viewBox="0 0 24.00 24.00" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                                           stroke-width="0.4800000000000001"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                                stroke-width="2.4" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                            <path
                                                d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                                stroke-width="2.4" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>

                            <div v-else class="chat chat-start flex flex-row">
                                <div class="chat-image avatar placeholder">
                                    <div class="w-10 rounded-full bg-base-300 ring ring-accent">
                                        <span>{{ getPlaceholder(message.author.username) }}</span>
                                    </div>
                                </div>
                                <div class="chat-bubble break-words">
                                    <div class="text text-left mb-1 flex flex-row">
                                        <span class="text-accent">
                                            {{ message.author.username }}
                                        </span>
                                    </div>
                                    <div v-if="message.replyTarget" class="card w-full border border-accent p-0 mb-4">
                                        <div class="card-body p-4">
                                            <div class="flex flex-col sm:flex-row">
                                                <div>
                                                    <div class="text text-accent mb-1">
                                                        {{ message.replyTarget.author.username }}
                                                    </div>
                                                    <span>
                                                        {{ message.replyTarget.content }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span>
                                        {{ message.content }}
                                    </span>
                                    <span v-if="message.edited">
                                        edited
                                    </span>
                                </div>

                                <button v-if="status === 'authenticated'"
                                        class="btn btn-ghost self-center btn-square btn-sm"
                                        @click="setReply(message.id)">
                                    <svg class="w-5 fill-current" version="1.1" id="_x32_"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve"
                                         fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                           stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier"> <g> <path class="st0"
                                                                               d="M448.115,240.956c-39.306-39.389-94.166-63.913-154.235-63.885h-51.026V86.142 c0-8.058-4.506-15.439-11.674-19.125c-7.172-3.677-15.8-3.047-22.352,1.64L8.983,211.746C3.343,215.784,0,222.295,0,229.232 s3.343,13.448,8.983,17.486l199.844,143.088c6.552,4.687,15.18,5.316,22.352,1.64c7.169-3.686,11.674-11.068,11.674-19.125v-90.929 h51.026c31.59,0.019,59.708,12.651,80.467,33.331c20.676,20.755,33.305,48.882,33.332,80.473c0,28.803,23.353,52.16,52.16,52.16 S512,424,512,395.196C512.028,335.127,487.508,280.271,448.115,240.956z"></path> </g> </g></svg>
                                </button>
                            </div>
                        </template>
                    </div>
                </FetchPlaceholder>

            </div>

            <div
                :class="`collapse collapse-arrow bg-base-300 w-full ${status !== 'authenticated' ? 'collapse-close' : '' }`">
                <input type="checkbox" id="message_input_checkbox"/>
                <div class="collapse-title text-lg font-medium">
                    {{ messageInput.editTarget !== null ? 'Edit' : 'Write' }}
                    {{ status !== 'authenticated' ? '(Log in to use it)' : '' }}
                </div>
                <div class="collapse-content">

                    <div v-if="fetchState.error" class="alert alert-error mb-4 flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                             viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ fetchState.errorMessage }}</span>
                    </div>

                    <div v-if="reply" class="card w-full border border-accent p-0 mb-4">
                        <div class="card-body p-4">
                            <div class="flex flex-col sm:flex-row">
                                <div>
                                    <div class="text text-accent mb-1">
                                        {{ reply.author.username }}
                                    </div>
                                    <span>
                                        {{ reply.content }}
                                    </span>
                                </div>
                                <button
                                    class="btn btn-sm btn-outline self-center mt-4 btn-wide sm:mt-0 sm:w-auto sm:ml-auto"
                                    @click="reply = null">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-if="messageInput.editTarget" class="card w-full border border-accent p-0 mb-4">
                        <div class="card-body p-4">
                            <div class="flex flex-col sm:flex-row">
                                <div>
                                    <div class="text text-accent mb-1">
                                        {{ messageInput.editTarget.author.username }}
                                    </div>
                                    <span>
                                        {{ messageInput.editTarget.content }}
                                    </span>
                                </div>
                                <button
                                    class="btn btn-sm btn-outline self-center mt-4 btn-wide sm:mt-0 sm:w-auto sm:ml-auto"
                                    @click="messageInput.editTarget = null; messageInput.data = ''">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    <textarea
                        :class="`textarea textarea-accent resize-none w-full scrollbar ${messageInput.isValid ? '' : 'textarea-error'}`"
                        id="message_input"
                        rows="1"
                        @input="countRows()"
                        v-model="messageInput.data"
                        :disabled="status !== 'authenticated'"
                        placeholder="Your message"/>
                    <div class="flex flex-row justify-end mt-2">
                        <button @click="messageInput.editTarget !== null ? saveEditedMessage() : sendMessage()"
                                id="message_submit" class="btn btn-sm w-full sm:w-auto btn-accent">
                            {{ messageInput.editTarget !== null ? 'Save' : 'Send' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "assets/css/common.css";
</style>