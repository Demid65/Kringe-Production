<script setup lang="ts">
import {sidebarTree} from "~/types/mocks";

const treeData = useState<TreeNode[]>('treeData', () => sidebarTree)
</script>

<template>
    <div class=" flex flex-col flex-none bg-base-200 p-4 h-full rounded-xl">
        <input type="text" class="input bg-base-300" placeholder="search...">
        <div v-for="node in treeData" class="flex flex-col">
            <TreeNode :data="node"/>
        </div>
    </div>
</template>
