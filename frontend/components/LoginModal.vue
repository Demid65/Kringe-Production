<script setup lang="ts">
import {loginModes} from "~/utils/types";

const props = defineProps(['id'])
const mode = useState('login_mode', () => loginModes.login)
const loading = useState('loading', () => false)
const authResult = useState('authResult', () => ({
    error: '',
    ok: true
}))
const creds = useState('creds', () => ({
    username: "",
    password: "",
    repeatPassword: "",
    usernameValid: true,
    passwordValid: true,
    repeatPasswordValid: true
}))

const { data, signIn } = useAuth()

function toggleMode(inputMode: loginModes) {
    mode.value = inputMode
}

async function tryAuth(inputMode: loginModes) {
    const result = validateInput(mode.value)
    if (result) {
        loading.value = true
        authResult.value.ok = true
        authResult.value.error = ''

        const res = await signIn('credentials', {
            redirect: false,
            register: inputMode === loginModes.register,
            username: creds.value.username,
            password: creds.value.password
        })
        loading.value = false
        console.log(data.value)

        console.log(res)

        if (res.url === null) {
            authResult.value.ok = false
            authResult.value.error = res.error
        } else {
            window[props.id].close()
        }
    }
}

function validateInput(inputMode: loginModes) {
    creds.value.usernameValid = true
    creds.value.passwordValid = true
    creds.value.repeatPasswordValid = true

    if(creds.value.password.length < 3) {
        creds.value.passwordValid = false
        return false
    }
    if(inputMode == loginModes.register && creds.value.password !== creds.value.repeatPassword) {
        creds.value.repeatPasswordValid = false
        return false
    }
    if(creds.value.username.length < 3) {
        creds.value.usernameValid = false
        return false
    }

    return true
}
</script>

<template>
    <dialog :id="props.id" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box flex flex-col gap-4">
            <template v-if="mode === loginModes.login">
                <div class="flex flex-row">
                    <h3 class="font-bold text-lg mb-4">Log in</h3>
                    <button class="btn btn-sm btn-outline ml-auto" @click="toggleMode(loginModes.register)">Register</button>
                </div>

                <div v-if="!authResult.ok" class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{{ authResult.error }}</span>
                </div>

                <div>
                    <input type="text" :class="`input w-full bg-base-300 ${creds.usernameValid ? '' : 'input-error'}`" name="username" v-model="creds.username" placeholder="username">
                    <label v-if="!creds.usernameValid" class="label p-0 mt-1">
                        <span class="label-text text-error">3+ chars</span>
                    </label>
                </div>
                <div>
                    <input type="password" :class="`input w-full bg-base-300 ${creds.passwordValid ? '' : 'input-error'}`" name="password" v-model="creds.password" placeholder="password">
                    <label v-if="!creds.passwordValid" class="label p-0 mt-1">
                        <span class="label-text text-error">3+ chars</span>
                    </label>
                </div>



                <div class="modal-action">
                    <button class="btn btn-accent w-full" @click="tryAuth(loginModes.login)">
                        <span v-if="loading === true" class="loading loading-spinner loading-lg"></span>
                        <span v-else>Log in</span>
                    </button>
                </div>
            </template>
            <template v-else-if="mode === loginModes.register">
                <div class="flex flex-row">
                    <h3 class="font-bold text-lg mb-4">Register</h3>
                    <button class="btn btn-sm btn-outline ml-auto" @click="toggleMode(loginModes.login)">
                        Log in
                    </button>
                </div>

                <div v-if="!authResult.ok" class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{{ authResult.error }}</span>
                </div>

                <div>
                    <input type="text" :class="`input w-full bg-base-300 ${creds.usernameValid ? '' : 'input-error'}`" name="username" v-model="creds.username" placeholder="username">
                    <label v-if="!creds.usernameValid" class="label p-0 mt-1">
                        <span class="label-text text-error">3+ chars</span>
                    </label>
                </div>
                <div>
                    <input type="password" :class="`input w-full bg-base-300 ${creds.passwordValid ? '' : 'input-error'}`" name="password" v-model="creds.password" placeholder="password">
                    <label v-if="!creds.passwordValid" class="label p-0 mt-1">
                        <span class="label-text text-error">3+ chars</span>
                    </label>
                </div>
                <div>
                    <input type="password" :class="`input w-full bg-base-300 ${creds.repeatPasswordValid ? '' : 'input-error'}`" name="password_repeat" v-model="creds.repeatPassword" placeholder="repeat password">
                    <label v-if="!creds.repeatPasswordValid" class="label p-0 mt-1">
                        <span class="label-text text-error">3+ chars and must match with password</span>
                    </label>
                </div>

                <div class="modal-action">
                    <button class="btn btn-accent w-full" @click="tryAuth(loginModes.register)">
                        <span v-if="loading === true" class="loading loading-spinner loading-lg"></span>
                        <span v-else>Register</span>
                    </button>
                </div>
            </template>
            <template v-else>
                <h1>
                   Something went wrong: {{ mode }}
                </h1>
            </template>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>

<style scoped>

</style>