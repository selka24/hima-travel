<script setup lang="ts">
    const props = defineProps<{package: RecommendPackage, date: string}>();
    const {buildStorageUrl, formatDateSQ} = useUtils();
    const mainStore = useMainStore()
    const hotel = computed(() => {
        return props.package.hotel_data.hotel;
    })

    const hotelPhoto = computed(() => {
        if(hotel.value){
            if(hotel.value.hotel_photos) {
                return  buildStorageUrl(hotel.value.hotel_photos[0].file_path)
            }
        }
        return null;
    })

    const origin = computed(() => {
        return mainStore.allOrigins ? mainStore.allOrigins[0].id : -1;
    })
</script>

<template>
    <div class="bg-white relative p-7 text-secondary rounded-[30px] border border-gray-normal">
        <div class="relative rounded-[10px] overflow-hidden">
            <nuxt-img alt="hotel-photo" loading="lazy" v-if="hotelPhoto" :src="hotelPhoto" width="383" height="400" class="bg-gray-light w-full min-h-[400px]"/>
            <div class="font-bold text-5xl absolute-center text-white">{{ hotel.city }}</div>
        </div>
        <div class="mt-7 items-center flex justify-between">
            <div>
                <div class="text-2xl font-bold">{{ hotel.city }}</div>
                <div class="text-gray-normal">nga Tirana</div>
            </div>
            <div class="ml-auto text-right">
                <div class="text-2xl sm:text-3xl 2xl:text-5xl font-bold">{{ package.total_price / 2 }}€</div>
                <div class="text-gray-normal">personi</div>
            </div>
        </div>
        <div class="border-t border-primary mt-4 mb-5 py-3">
            <div class="text-lg font-bold">Hotel {{ hotel.name }} me {{hotel.stars ? `${hotel.stars} yje` : ''}}</div>
            <div class="mt-4 flex justify-between">
                <div>
                    <div class="text-[#55C7F8]">Nisja</div>
                    <div class="text-gray-normal">
                        {{ formatDateSQ(package.hotel_data.check_in_date, 'dd/MM/yyyy') }}
                    </div>
                </div>
                <div>
                    <div class="text-[#55C7F8]">Netët</div>
                    <div class="text-gray-normal text-right">
                        {{ package.hotel_data.number_of_nights }}
                    </div>
                </div>
            </div>
        </div>
        <nuxt-link :to="`/search?origin_id=${origin}&destination_id=${package.hotel_data.hotel.destination_id}&nights=${package.hotel_data.number_of_nights}&checkin_date=${date}&page=1`">
            <button-default class="uppercase px-8 py-4 font-normal absolute left-1/2 -translate-x-1/2">më shumë</button-default>
        </nuxt-link>
    </div>
</template>

<style scoped>

</style>
