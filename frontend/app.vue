<script setup>
const colorMode = useColorMode()

</script>

<template>
    <div class="h-screen flex flex-col">
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <NuxtLink to="/">
                    <span class="btn btn-ghost text-lg normal-case">Kringe</span>
                </NuxtLink>
            </div>
            <div class="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                        <div className="w-10 rounded-full ring ring-neutral">
<!--                            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="sus" />-->
                            <span class="text-lg">USR</span>
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <NuxtLink :to="`/profile`">
                                Profile
                            </NuxtLink>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex flex-row flex-1">
            <input type="checkbox" class="drawer-toggle">
            <NuxtPage />
            <SideBar class="hidden lg:block"/>
        </div>
    </div>

</template>