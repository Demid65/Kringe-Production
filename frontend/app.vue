<script setup lang="ts">

const isSidebarVisible = useState('sidebarVisibility', () => false)

const { status, data, signOut } = useAuth()

function toggleSidebar() {
    isSidebarVisible.value = !isSidebarVisible.value;
}

function getPlaceholder(name: string) {
    return name.slice(0, 3).toUpperCase()
}

const loginModalId = 'login_modal'

const colorMode = useColorMode()

function toggleMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
  console.log(colorMode.preference)
}
</script>

<template>
    <LoginModal :id="loginModalId"/>
    <div class="h-screen flex flex-col">
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <NuxtLink to="/">
                    <div class="btn btn-ghost gap-1">
                        <span class=" text-lg normal-case pr-0">
                        Uni
                    </span>
                    <div class="badge badge-warning bg-amber-500 m-0 normal-case text-lg rounded-sm font-medium p-0">
                        Hub
                    </div>
                    </div>
                </NuxtLink>
                <button @click="toggleMode" class="btn btn-sm btn-accent ml-2">
                    <svg v-if="colorMode.preference === 'dark'" class="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                    <svg v-else class="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                </button>
            </div>
            <div v-if="status === 'authenticated'" class="flex-none">
              <div class="dropdown dropdown-end">
                <label tabIndex="0" class="btn btn-ghost btn-circle avatar placeholder">
                  <div class="w-10 rounded-full ring ring-accent">
                    <span class="text-lg">{{ data.username ? getPlaceholder(data.username) : 'OIO' }}</span>
                  </div>
                </label>
                <ul tabIndex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                    <NuxtLink :to="`/profile`">Profile</NuxtLink>
                  </li>
                  <li>
                    <button @click="signOut({redirect: false})">Logout</button>
                  </li>
                </ul>
              </div>
            </div>

            <div v-if="status === 'unauthenticated'" class="flex-none">
                <button class="btn btn-sm btn-accent" :onclick="`window.${loginModalId}.showModal()`">Login</button>
            </div>
        </div>
        <div class="flex flex-row flex-1">
            <div class="flex-1">
                <NuxtPage/>
            </div>
            <div :class="['lg:w-64 hidden lg:flex', isSidebarVisible ? 'hidden' : 'flex']">
                <SideBar/>
            </div>
        </div>

        <div class="fixed bottom-4 right-4 lg:hidden z-50">
            <button class="rounded-full bg-accent text-white p-2" @click="toggleSidebar()">
                <svg
                    class="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path v-if="isSidebarVisible" d="M6 18L18 6M6 6l12 12"></path>
                    <path v-else d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>

        <div
            :class="['fixed inset-0 z-10 bg-opacity-75 overflow-y-auto', isSidebarVisible ? 'block' : 'hidden', 'lg:hidden']">
<!--            <div class="absolute inset-0 flex justify-end">-->
<!--            </div>-->
            <div class="flex h-full">
                <div class="w-full">
                    <SideBar/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 1024px) {
    .flex-1 {
        flex: 1;
    }
}
</style>
