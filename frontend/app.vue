
<template>
    <div class="h-screen flex flex-col">
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <NuxtLink to="/">
                    <span class="btn btn-ghost text-lg normal-case">Kringe</span>
                </NuxtLink>
            </div>
            <div class="flex-none">
                <div class="dropdown dropdown-end">
                    <label tabIndex={0} class="btn btn-ghost btn-circle avatar placeholder">
                        <div class="w-10 rounded-full ring ring-neutral">
                            <span class="text-lg">USR</span>
                        </div>
                    </label>
                    <ul tabIndex={0} class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <NuxtLink :to="`/profile`">
                                Profile
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :to="`/logout`">
                                Logout
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex flex-row flex-1 p-4 pt-0">
            <input type="checkbox" class="drawer-toggle">
            <NuxtPage />
            <SideBar class="hidden lg:block"/>
        </div>
    </div>

</template>