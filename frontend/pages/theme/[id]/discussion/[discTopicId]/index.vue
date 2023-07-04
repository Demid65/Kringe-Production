<script setup lang="ts">
import {routesMap} from "~/utils/routes";

const { status, data } = useAuth()

const { data: topic, pending, error, refresh } = await useFetch(routesMap['courseDiscussion'], {
    query: {
        data: 'messages'
    }
})

const messageInput = useState('message_input', () => "")
const textRows = useState(() => countRows(messageInput.value))

function countRows(text: string) {
    let rows = text.split(/\r\n|\r|\n/).length
    console.log(rows)
    return rows
}
const userId = 1

function getPlaceholder(name: string) {
    return name.slice(0, 3).toUpperCase()
}

function sendMessage() {
    console.log(messageInput.value)
    messageInput.value = ""
    countRows(messageInput.value)
}
</script>

<template>
    <Head>
        <Title>
            {{ topic.title }}
        </Title>
    </Head>
    <div class="flex flex-col container mx-auto px-2 h-full">
        <div class="card bg-base-200 shadow-xl h-full">
            <div class="card-body p-4 gap-0">
                <div class="card-title rounded-lg bg-base-300 p-4">
                    <h1 class="text-lg">{{ topic.title }}</h1>
                </div>
                <div class="flex flex-col gap-6 py-2">
                    <template v-for="message in topic.messages">
                        <div v-if="message.authorId === userId" class="chat chat-end">
                            <div class="chat-image avatar placeholder">
                                <div class="w-10 rounded-full bg-base-300 ring ring-accent">
                                    <span>{{ getPlaceholder(message.authorName) }}</span>
                                </div>
                            </div>
                            <div class="chat-bubble">
                                <div class="text-sm text-right text-accent mb-1">
                                    {{ message.authorName }}
                                </div>
                                {{ message.content }}
                            </div>
                        </div>

                        <div v-else class="chat chat-start">
                            <div class="chat-image avatar placeholder">
                                <div class="w-10 rounded-full bg-base-300 ring ring-accent">
                                    <span>{{ getPlaceholder(message.authorName) }}</span>
                                </div>
                            </div>
                            <div class="chat-bubble">
                                <div class="text-sm text-left text-accent mb-1">
                                    {{ message.authorName }}
                                </div>
                                {{ message.content }}
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
                        <textarea
                            class="textarea textarea-accent resize-none w-full"
                            :rows="textRows"
                            @input="() => {textRows = countRows(messageInput)}"
                            v-model="messageInput"
                            :disabled="status !== 'authenticated'"
                            placeholder="Your message" />
                        <div class="flex flex-row justify-end">
                            <button @click="sendMessage()" class="btn btn-sm btn-accent">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>