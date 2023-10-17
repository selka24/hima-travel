<script setup lang="ts">
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
        <div class="bg-gradient-to-r rounded-[20px] from-white to-white/80 w-full h-[150px] backdrop-blur-[3px] relative z-10">
        </div>
        <div class="absolute left-12 -top-[40px] flex gap-x-1.5 z-20 h-10">
            <transition-group>
                <div v-for="type in searchTypes" :key="type.value"
                     @click="handleTypeChange(type.value)"
                     :class="`transition-all ease-in duration-150 text-sm cursor-pointer font-bold px-10 py-3.5 rounded-tl-xl rounded-tr-xl ${activeType === type.value ? 'bg-white text-primary' : 'bg-gray-light text-gray-medium'}`">
                    {{type.title}}
                </div>
            </transition-group>
        </div>
    </div>
</template>

<style scoped>

</style>
