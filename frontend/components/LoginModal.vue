<script setup lang="ts">
import {loginModes} from "~/utils/types";

const props = defineProps(['id'])
const mode = useState('login_mode', () => loginModes.login)
const creds = useState('creds', () => ({
    username: "",
    password: "",
    repeatPassword: "",
    usernameValid: true,
    passwordValid: true,
    repeatPasswordValid: true
}))

function toggleMode(inputMode: loginModes) {
    mode.value = inputMode
}

function validateInput(inputMode: loginModes) {
    creds.value.usernameValid = true
    creds.value.passwordValid = true
    creds.value.repeatPasswordValid = true

    if(creds.value.password.length < 3) {
        creds.value.passwordValid = false
    }
    if(inputMode == loginModes.register && creds.value.password !== creds.value.repeatPassword) {
        creds.value.repeatPasswordValid = false
    }
    if(creds.value.username.length < 3) {
        creds.value.usernameValid = false
    }
}
</script>

<template>
    <dialog :id="props.id" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box flex flex-col gap-4">
            <template v-if="mode === loginModes.login">
                <div class="flex flex-row">
                    <h3 class="font-bold text-lg mb-4">Log in</h3>
                    <button class="btn btn-sm btn-neutral ml-auto" @click="toggleMode(loginModes.register)">Register</button>
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
                    <button class="btn btn-accent w-full" @click="validateInput(loginModes.login)">Log in</button>
                </div>
            </template>
            <template v-else-if="mode === loginModes.register">
                <div class="flex flex-row">
                    <h3 class="font-bold text-lg mb-4">Register</h3>
                    <button class="btn btn-sm btn-neutral ml-auto" @click="toggleMode(loginModes.login)">Log in</button>
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
                    <button class="btn btn-accent w-full" @click="validateInput(loginModes.register)">Register</button>
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