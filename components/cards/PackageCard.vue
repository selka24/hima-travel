<script setup lang="ts">
    const props = defineProps<{ package: Package }>();

    const tabs = ['Akomodimi', 'Hoteli', 'Fluturimi'];
    const activeTab = ref(0);

    const handleTabChange = (tab: number) => {
        activeTab.value = tab;
    }

    const icons = ['calendar', 'suitcase', 'backpack', 'bed', 'food', 'info']

    const sampleInfo = [
        '5 Netë, e Mar, 20 Shtator 2022',
        'Valixhe deri në 22 kg',
        'Çanë shpine deri në 22 kg',
        '1 x Dhomë dyshe',
        'Mëngjesi i përfshirë',
        'Info',
    ]
</script>

<template>
    <div class="grid grid-cols-12 border-2 border-gray-normal rounded-[30px] bg-white">
        <div class="relative p-7 col-span-12 md:col-span-9 lg:col-span-8 xl:col-span-5 md:bg-gray-lighter/30 xl:bg-none">
            <div class="absolute z-[10] bg-primary rounded-[20px_0] text-white font-bold py-4 px-2 text-center w-40">All inclusive</div>
            <div class="w-full h-full min-h-[384px] rounded-[20px] overflow-hidden">
                <Carousel :options="['bed.png', 'sunbed.png', 'beach.png']">
                    <template #option="{option}">
                        <nuxt-img class="w-full h-full object-cover" :src="`/package-sample/${option}`" :alt="option"/>
                    </template>
                </Carousel>
            </div>
        </div>
        <div class="p-7 col-span-12 sm:col-span-8 md:order-last md:col-span-11 lg:col-span-10 xl:order-none xl:col-span-4 flex flex-col">
            <div class="text-3xl font-bold mb-10">Hotel Filan Fisteku</div>
            <ArrowTabs @tab-change="handleTabChange" :tabs="tabs" :active-tab="activeTab" class="mb-10"/>
            <div class="flex flex-col gap-y-3.5">
                <div v-for="(icon, idx) in icons" class="flex gap-4 items-center">
                    <nuxt-icon :name="icon" filled class="text-2xl"/>
                    <div class="font-bold">{{ sampleInfo[idx] }}</div>
                </div>
            </div>
        </div>
        <div class="flex py-7 sm:py-0 justify-between sm:flex-col sm:justify-center items-center col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-4 xl:col-span-3 px-5 md:bg-gray-lighter/30">
            <div class="flex flex-col items-center sm:mt-auto sm:mb-20">
                <div class="mb-2 text-lg text-gray-normal">Për person</div>
                <div class="font-bold text-[36px] min-w-max lg:text-[55px]">{{ package?.total_price }} €</div>
            </div>
            <button-default class="h-[70px] max-w-[260px] w-full sm:mb-14 font-normal">Më shumë</button-default>
        </div>
    </div>
</template>

<style scoped>

</style>
