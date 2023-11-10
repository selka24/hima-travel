<template>
    <div class="px-7 pb-7 relative flex flex-col justify-center sm:flex-row gap-0 sm:gap-5 md:gap-0 sm:justify-between md:flex-col items-center md:justify-center border border-gray-normal bg-white rounded-[30px]">
        <CornerInfo>
            {{roomBasisInfo(mainStore.currTravelPackage.hotel_data.room_basis)}}
        </CornerInfo>
        <div class="flex flex-grow max-w-max mt-24 flex-col gap-y-5 w-full">
            <div v-for="(info, idx) in packageInfo" class="flex gap-3" :key="idx + 'info'">
                <nuxt-icon :name="info.icon" class="text-2xl" filled />
                <div>{{info.value}}</div>
            </div>
        </div>
        <div class="flex flex-col items-center mt-16 sm:mt-0 max-w-full sm:max-w-[260px] md:max-w-full w-full h-full md:h-auto">
            <div class="text-lg font-bold mt-auto md:mt-0">Për person</div>
            <div class="font-bold text-[36px] min-w-max lg:text-[55px]">{{ price }} €</div>
            <button-default class="h-[70px] w-full font-normal mt-auto md:mt-0" @click="handleWhatsappMessage">Vazhdo</button-default>
        </div>
    </div>
</template>
<script setup lang="ts">
import ButtonDefault from "~/components/ButtonDefault.vue";

const {sendWhatsappMessage, displayNights, roomBasisInfo, formatDateSQ} = useUtils();

const icons = ['user', 'moon', 'calendar', 'food']
const sampleInfo = [
    '2 Adults',
    '7 Netë',
    'Friday 20 Shtator 2023',
    'Mëngjesi i përfshirë',
]
const mainStore = useMainStore();

const packageInfo = computed(() => {
    if(!mainStore.currTravelPackage) return [];
    return [
        {icon: 'user', value: '2 të rritur'},
        {icon: 'calendar', value: `E ${formatDateSQ(new Date(mainStore.currTravelPackage.hotel_data.check_in_date), 'iiii, d LLLL yyyy')}`},
        {icon: 'moon', value: displayNights(mainStore.currTravelPackage.hotel_data.number_of_nights)},
        {icon: 'food', value: roomBasisInfo(mainStore.currTravelPackage.hotel_data.room_basis)},
    ]
})

const price = computed(() => {
    if(mainStore.currTravelPackage?.total_price){
        return Number(mainStore.currTravelPackage.total_price) / 2;
    }
    return 'null';
})

const handleWhatsappMessage = () =>{
    if (mainStore.currTravelPackage) sendWhatsappMessage(mainStore.currTravelPackage);
}

</script>

<style scoped>

</style>
