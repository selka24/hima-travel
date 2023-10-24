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
        <div class="p-7 col-span-12 lg:col-span-5 xl:col-span-5">
            <div class="bg-gray-light w-full h-full min-h-[384px] rounded-[20px]"></div>
        </div>
        <div class="p-7 col-span-8 lg:col-span-5 xl:col-span-4 flex flex-col">
            <div class="text-3xl font-bold mb-10">Hotel Filan Fisteku</div>
            <ArrowTabs @tab-change="handleTabChange" :tabs="tabs" :active-tab="activeTab" class="mb-10"/>
            <div class="flex flex-col gap-y-6">
                <div v-for="(icon, idx) in icons" class="flex gap-4 items-center">
                    <nuxt-icon :name="icon" filled class="text-2xl"/>
                    <div class="font-bold">{{ sampleInfo[idx] }}</div>
                </div>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center col-span-4 lg:col-span-2 xl:col-span-3 px-5 lg:bg-gray-lighter/30 ">
            <div class="mt-auto mb-2 text-lg text-gray-normal">Për person</div>
            <div class="font-bold mb-20 text-[55px] lg:text-[36px] min-w-max xl:text-[55px]">{{ package?.total_price }} €</div>
            <button-default class="h-[70px] max-w-[260px] w-full mb-14 font-normal">Më shumë</button-default>
        </div>
    </div>
</template>

<style scoped>

</style>
