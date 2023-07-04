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
            </div>
            <div v-if="status === 'authenticated'" class="flex-none">
              <div class="dropdown dropdown-end">
                <label tabIndex="0" class="btn btn-ghost btn-circle avatar placeholder">
                  <div class="w-10 rounded-full ring ring-accent">
                    <span class="text-lg">{{ data.username ? getPlaceholder(data.username) : 'SUS' }}</span>
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
            <div class="absolute inset-0 flex justify-end">
            </div>
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
