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
            <label tabIndex="0" class="btn btn-ghost btn-circle avatar placeholder">
              <div class="w-10 rounded-full ring ring-neutral">
                <span class="text-lg">USR</span>
              </div>
            </label>
            <ul tabIndex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <NuxtLink :to="`/profile`">Profile</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="`/logout`">Logout</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    <div class="flex flex-row flex-1">
      <div class="flex-1">
        <NuxtPage />
      </div>
      <div :class="['lg:w-64', isSidebarVisible ? 'block' : 'hidden']">
        <SideBar />
      </div>
    </div>
    
    <div class="fixed bottom-4 right-4 lg:hidden z-50">
      <button class="rounded-full bg-blue-500 text-white p-2" @click="toggleSidebar">
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
    
    <div :class="['fixed inset-0 z-10 bg-white bg-opacity-75 overflow-y-auto', isSidebarVisible ? 'block' : 'hidden', 'lg:hidden']">
      <div class="absolute inset-0 flex justify-end">
        <button class="text-2xl px-4 py-2" @click="toggleSidebar">&times;</button>
      </div>
      <div class="flex h-full">
        <div class="w-full">
          <SideBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarVisible: false,
    };
  },
  mounted() {
    this.toggleSidebarVisibility();
    window.addEventListener('resize', this.toggleSidebarVisibility);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.toggleSidebarVisibility);
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    toggleSidebarVisibility() {
      this.isSidebarVisible = window.innerWidth >= 1024;
    },
  },
};
</script>
  
<style scoped>
    @media (min-width: 1024px) {
        .flex-1 {
            flex: 1;
        }
    }
</style>
