<script setup lang="ts">
import {routesMap} from "~/utils/routes";
import {debounce} from "~/utils/debounce";

const { data: tree, pending, error, refresh } = await useFetch(routesMap['sidebarData'], {
    query: {
        data: 'sidebar'
    }
})

const props = defineProps(['idPrefix'])

const treeState = useState('tree', () => Array.from(tree.value, (x) => false))
const searchString = useState('searchstring', () => "")

const debouncedSearch = debounce(search, 300)

function search() {
    for (let i = 0; i < treeState.value.length; i++) {
        treeState.value[i] = false
    }

    if (searchString.value === "") {
        return
    }

    for (let i = 0; i < tree.value.length; i++){
        let bs = tree.value[i];
        for (let j = 0; j < bs.courses.length; j++) {
            let child = bs.courses[j]
            if (child.title.toLowerCase().includes(searchString.value.toLowerCase())) {
                treeState.value[i] = true
            }
        }
    }

}

</script>

<template>
    <div class=" flex flex-col flex-none bg-base-200 p-4 h-full rounded-xl shadow-xl">
        <input type="text" class="input bg-base-300 mb-2" @input="debouncedSearch()" v-model="searchString" placeholder="search...">

        <FetchPlaceholder :pending="pending" :error="error" >
            <div v-for="(node, i) in tree" class="flex flex-col">
                <TreeNode :idPrefix="props.idPrefix" :data="node" v-model:isOpen="treeState[i]" />
            </div>
        </FetchPlaceholder>

    </div>
</template>
