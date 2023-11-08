<template>
    <div class="pt-8 pb-12 px-9 bg-white rounded-[30px] border border-gray-normal">
        <div class="font-bold text-[22px] mb-10">Rezervo udhëtimin tënd tani</div>
        <div class="grid grid-cols-6">
            <div class="col-span-6 sm:col-span-3 md:col-span-4 flex flex-col lg:max-h-[170px] gap-y-5 flex-wrap">
                <div v-for="(info, idx) in bookCardInfo" class="flex gap-3" :key="idx + 'bookinfo'">
                    <nuxt-icon :name="info.icon" class="text-2xl" filled />
                    <div>{{info.value}}</div>
                </div>
            </div>
            <div class="col-span-6 sm:col-span-3 md:col-span-2 flex justify-end">
                <div class="flex flex-col xs:flex-row items-center w-full sm:w-auto gap-x-5 pt-10 sm:pt-0 justify-between sm:flex-col sm:justify-center">
                    <div class="flex flex-col items-center">
                        <div class="text-lg font-bold">Për person</div>
                        <div class="font-bold text-[36px] min-w-max sm:text-[55px]">{{ pricePP }} €</div>
                    </div>
                    <button-default
                        class="h-[70px] w-[260px] font-normal"
                        @click="sendWhatsappMessage">
                        Vazhdo
                    </button-default>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const {sendWhatsappMessage, displayNights, roomBasisInfo, formatDateSQ} = useUtils();
const mainStore = useMainStore();
const hotel_data = computed(() => {
    return mainStore.currTravelPackage?.hotel_data
})

const pricePP = computed(() => {
    if(mainStore.currTravelPackage?.total_price){
        return Number(mainStore.currTravelPackage.total_price) / 2;
    }
    return 'null'
})

const bookCardInfo = computed(() => {
    if(!hotel_data.value) return [];
    return [
        {icon: 'user', value: '2 të rritur'},
        {icon: 'moon', value: displayNights(hotel_data.value.number_of_nights)},
        {icon: 'calendar', value: `E ${formatDateSQ(new Date(hotel_data.value.check_in_date), 'iiii, d LLLL yyyy')}`},
        {icon: 'backpack', value: 'Bagazh krahu 10 kg'},
        {icon: 'bed', value: JSON.parse(hotel_data.value.room_details)[0]},
        {icon: 'food', value:  roomBasisInfo(hotel_data.value.room_basis)},
    ];
})



</script>

<style scoped>

</style>
