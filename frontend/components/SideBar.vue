<script setup lang="ts">
import {sidebarTree} from "~/types/mocks";

const treeData = useState('treeData', () => sidebarTree)

const { data: tree, pending, error, refresh } = await useFetch('/api/getTree')

</script>

<template>
    <div class=" flex flex-col flex-none bg-base-200 p-4 h-full rounded-xl shadow-xl">
        <input type="text" class="input bg-base-300 mb-2" placeholder="search...">

        <FetchPlaceholder :pending="pending" :error="error" >
            <div v-for="node in tree" class="flex flex-col">
                <TreeNode :data="node"/>
            </div>
        </FetchPlaceholder>

    </div>
</template>
