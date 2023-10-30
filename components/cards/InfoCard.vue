<template>
    <div class="px-7 pb-7 relative flex flex-col justify-center sm:flex-row gap-0 sm:gap-5 md:gap-0 sm:justify-between md:flex-col items-center md:justify-center border border-gray-normal bg-white rounded-[30px]">
        <CornerInfo/>
        <div class="flex flex-grow max-w-max mt-24 flex-col gap-y-5 w-full">
            <div v-for="(info, idx) in sampleInfo" class="flex gap-3" :key="idx + 'info'">
                <nuxt-icon :name="icons[idx]" class="text-2xl" filled />
                <div>{{info}}</div>
            </div>
        </div>
        <div class="flex flex-col items-center mt-16 sm:mt-0 max-w-full sm:max-w-[260px] md:max-w-full w-full h-full md:h-auto">
            <div class="text-lg font-bold mt-auto md:mt-0">Për person</div>
            <div class="font-bold text-[36px] min-w-max lg:text-[55px]">{{ price }} €</div>
            <button-default class="h-[70px] w-full font-normal mt-auto md:mt-0" @click="sendWhatsappMessage">Vazhdo</button-default>
        </div>
    </div>
</template>
<script setup lang="ts">
const {sendWhatsappMessage} = useUtils();

const icons = ['user', 'moon', 'calendar', 'food']
const sampleInfo = [
    '2 Adults',
    '7 Netë',
    'Friday 20 Shtator 2023',
    'Mëngjesi i përfshirë',
]
const mainStore = useMainStore();

const price = computed(() => {
    return mainStore.currTravelPackage?.total_price || 'Null';
})

</script>

<style scoped>

</style>
