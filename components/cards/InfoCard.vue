<template>
    <div class="px-7 pb-7 relative flex flex-col items-center justify-center border border-gray-normal bg-white rounded-[30px]">
        <CornerInfo/>
        <div class="flex flex-grow max-w-max mt-24 flex-col gap-y-5 w-full">
            <div v-for="(info, idx) in sampleInfo" class="flex gap-3" :key="idx + 'info'">
                <nuxt-icon :name="icons[idx]" class="text-2xl" filled />
                <div>{{info}}</div>
            </div>
        </div>
        <div class="flex flex-col items-center w-full">
            <div class="text-lg font-bold">Për person</div>
            <div class="font-bold text-[36px] min-w-max lg:text-[55px]">399 €</div>
            <button-default class="h-[70px] w-full font-normal">Vazhdo</button-default>
        </div>
    </div>
</template>
<script setup lang="ts">
const icons = ['user', 'moon', 'calendar', 'food']
const sampleInfo = [
    '2 Adults',
    '7 Netë',
    'Friday 20 Shtator 2023',
    'Mëngjesi i përfshirë',
]
</script>

<style scoped>

</style>
