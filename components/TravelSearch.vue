<script setup lang="ts">
import TravelPlaces from "~/components/TravelPlaces.vue";
import {useTrigger} from "~/composables/trigger";

interface SearchType {
    title: string
    value: number
}


const {$api} = useNuxtApp();
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

// const {toggleTrigger} = useTrigger()
const handleGetOrigins = async () => {
    const {data, pending, error} = await $api.origins.getOrigins();
    alert(JSON.stringify(data))
    console.log(data, 'datadatadatadata')
}
</script>

<template>
    <div class="relative">
        <div class="absolute left-12 -top-[40px] flex gap-x-1.5 z-20 h-11">
            <div v-for="type in searchTypes" :key="type.value"
                 @click="handleTypeChange(type.value)"
                 :class="`transition-all ease-in duration-150 text-sm cursor-pointer font-bold px-10 py-3.5 rounded-tl-xl rounded-tr-xl ${activeType === type.value ? 'bg-white text-primary' : 'bg-gray-light text-gray-medium'}`">
                {{type.title}}
            </div>
        </div>
        <div class="grid sm:grid-cols-6 lg:grid-cols-9 gap-y-4 gap-x-2.5 pt-8 pb-12 px-10 bg-gradient-to-r rounded-[20px] from-white to-white/80 w-full backdrop-blur-[3px] relative z-10 shadow-lg shadow-gray-normal">
            <travel-places class="sm:col-span-6 lg:col-span-5"/>
            <travel-calendar class="sm:col-span-4 lg:col-span-2"/>
            <travel-pasenger class="sm:col-span-1 lg:col-span-1"/>
            <button-default @click="handleGetOrigins" class="col-span-1 min-h-[70px]">Kërko</button-default>
        </div>
    </div>
</template>

<style scoped>

</style>
