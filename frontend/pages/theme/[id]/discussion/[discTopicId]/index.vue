<script setup lang="ts">
import {routesMap} from "~/utils/routes";
import {$fetch} from "ofetch";

const { status, data } = useAuth()
const route = useRoute()

const { data: topic, pending, error, refresh } = await useFetch(routesMap['discussionMessages'], {
    query: {
        themeId: route.params.discTopicId
    },
    server: false,
    lazy: true
})

const messageInput = useState('message_input', () => ({
    data: "",
    isValid: true
}))
const textRows = useState(() => countRows(messageInput.value.data))
const updateInterval = useState(() => null)
const fetchState = useState(() => ({
    pending: false,
    error: false,
    errorMessage: ''
}))

function countRows(text: string) {
    let rows = text.split(/\r\n|\r|\n/).length
    console.log(rows)
    return rows
}

function getPlaceholder(name: string) {
    return name.slice(0, 3).toUpperCase()
}

function validateInput() {
    messageInput.value.isValid = true

    if(messageInput.value.data.length < 3) {
        messageInput.value.isValid = false
        return false
    }

    return true
}

function sendMessage() {

    const res = validateInput()

    console.log(status.value, data.value.id)

    if (status.value !== 'authenticated') {
        console.log('What are you doing without account???????????????')
        return
    }

    if (!res) {
        return
    }

    console.log({
        user: data.value.id,
        courseId: route.params.id,
        discId: route.params.discTopicId,
        message: messageInput.value.data
    })
    $fetch(routesMap['createMessage'], {
        method: 'POST',
        body: {
            themeId: route.params.discTopicId,
            message: messageInput.value.data
        }
    }).then((val) => {
        fetchState.value.pending = false

        messageInput.value.data = ""
        messageInput.value.isValid = true

        textRows.value = countRows(messageInput.value.data)

        updateMessages()
    }, (err) => {
        fetchState.value.pending = false
        fetchState.value.error = true
        fetchState.value.errorMessage = err.data.statusMessage
        console.log(err)

        updateMessages()
    })
}

function updateMessages() {
    $fetch(routesMap['discussionMessages'], {
        query: {
            themeId: route.params.discTopicId
        }
    }).then((val) => {
        console.log('updating', val)
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
        <div class="card bg-base-200 shadow-xl h-full">
            <div class="card-body p-4 gap-0">
                <FetchPlaceholder :pending="pending" :error="error">
                    <div class="card-title rounded-lg bg-base-300 p-4">
                        <h1 class="text-lg">{{ topic.title }}</h1>
                    </div>
                    <div class="flex flex-col gap-6 py-2">

                        <template v-for="message in topic.messages">
                            <div v-if="message.author.id === data?.id" class="chat chat-end">
                                <div class="chat-image avatar placeholder">
                                    <div class="w-10 rounded-full bg-base-300 ring ring-accent">
                                        <span>{{ getPlaceholder(message.author.username) }}</span>
                                    </div>
                                </div>
                                <div class="chat-bubble break-words">
                                    <div class="text text-right text-accent mb-1">
                                        {{ message.author.username }}
                                    </div>
                                    <span>
                                        {{ message.content }}
                                    </span>
                                </div>
                            </div>

                            <div v-else class="chat chat-start">
                                <div class="chat-image avatar placeholder">
                                    <div class="w-10 rounded-full bg-base-300 ring ring-accent">
                                        <span>{{ getPlaceholder(message.author.username) }}</span>
                                    </div>
                                </div>
                                <div class="chat-bubble break-words">
                                    <div class="text text-left text-accent mb-1">
                                        {{ message.author.username }}
                                    </div>
                                    <span>
                                        {{ message.content }}
                                    </span>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div :class="`collapse collapse-arrow bg-base-300 w-full ${status !== 'authenticated' ? 'collapse-close' : '' }`">
                        <input type="checkbox" />
                        <div class="collapse-title text-lg font-medium">
                            Write {{ status !== 'authenticated' ? '(Log in to use it)' : '' }}
                        </div>
                        <div class="collapse-content">

                            <div v-if="fetchState.error" class="alert alert-error mb-4 flex flex-row">
                                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{{ fetchState.errorMessage }}</span>
                            </div>

                            <textarea
                                class="textarea textarea-accent resize-none w-full"
                                :rows="textRows"
                                @input="() => {textRows = countRows(messageInput.data)}"
                                v-model="messageInput.data"
                                :disabled="status !== 'authenticated'"
                                placeholder="Your message" />
                            <div class="flex flex-row justify-end">
                                <button @click="sendMessage()" class="btn btn-sm btn-accent">Send</button>
                            </div>
                        </div>
                    </div>
                </FetchPlaceholder>

            </div>
        </div>
    </div>
</template>

<style scoped>

</style>