<script setup lang="ts">
interface SearchType {
    title: string
    value: number
}

const activeType = ref<number>(1);

const searchTypes = ref<SearchType[]>([
    {title: 'Paketa', value: 1},
    // {title: 'Hotele', value: 2},
    // {title: 'Fluturime', value: 3},
])

//TODO remove handleTypeChange if no search types are added

const handleTypeChange = (value: number) => {
    activeType.value = value
}
</script>

<template>
    <div class="absolute left-12 -top-[40px] flex gap-x-1.5 z-10 h-11">
        <div v-for="type in searchTypes" :key="type.value"
             @click="handleTypeChange(type.value)"
             :class="`transition-all ease-in duration-150 text-sm cursor-pointer font-bold px-10 py-3.5 rounded-tl-xl rounded-tr-xl ${activeType === type.value ? 'bg-white text-primary' : 'bg-gray-light text-gray-medium'}`">
            {{type.title}}
        </div>
    </div>
</template>

<style scoped>

</style>
