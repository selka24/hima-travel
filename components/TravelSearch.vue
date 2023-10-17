<script setup lang="ts">
import TravelPlaces from "~/components/TravelPlaces.vue";

interface SearchType {
    title: string
    value: number
}

const searchTypes = ref<SearchType[]>([
    {title: 'Paketa', value: 1},
    {title: 'Hotele', value: 2},
    {title: 'Fluturime', value: 3},
])

const activeType = ref<number>(1);

const handleTypeChange = (value) => {
    activeType.value = value
}

</script>

<template>
    <div class="relative">
        <div class="absolute left-12 -top-[40px] flex gap-x-1.5 z-20 h-10">
            <div v-for="type in searchTypes" :key="type.value"
                 @click="handleTypeChange(type.value)"
                 :class="`transition-all ease-in duration-150 text-sm cursor-pointer font-bold px-10 py-3.5 rounded-tl-xl rounded-tr-xl ${activeType === type.value ? 'bg-white text-primary' : 'bg-gray-light text-gray-medium'}`">
                {{type.title}}
            </div>
        </div>
        <div class="grid grid-cols-9 gap-2.5 pt-8 pb-12 px-10 bg-gradient-to-r rounded-[20px] from-white to-white/80 w-full h-[150px] backdrop-blur-[3px] relative z-10">
            <travel-places class="col-span-5"/>
            <travel-calendar class="col-span-2"/>
            <travel-pasenger class="col-span-1"/>
            <button-default class="col-span-1">Kërko</button-default>
        </div>
    </div>
</template>

<style scoped>

</style>
