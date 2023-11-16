<script setup lang="ts">
    import ButtonDefault from "~/components/ButtonDefault.vue";
    import HotelStars from "~/components/HotelStars.vue";
    import HotelTitle from "~/components/package/HotelTitle.vue";



    const props = defineProps<{package: RecommendPackage, date: string}>();
    const {buildStorageUrl,displayNights, formatDateSQ} = useUtils();
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
    <div class="bg-white relative text-secondary rounded-[15px] md:rounded-[30px] p-2 sm:p-7 border border-gray-normal">
        <div class="relative rounded-[10px] overflow-hidden">
            <div class="absolute bottom-0 left-0 z-[10] bg-yellow-500 rounded-[0_10px] text-white font-bold p-1.5 text-center min-w-40 w-max">
                <hotel-stars :stars="hotel.stars" color="text-white"/>
            </div>
            <nuxt-img alt="hotel-photo" loading="lazy" v-if="hotelPhoto" :src="hotelPhoto" width="383" height="400" class="bg-gray-light w-full md:min-h-[400px]"/>
<!--            <div class="font-bold text-5xl absolute-center text-white">{{ hotel.city }}</div>-->
        </div>
        <div class="mt-7 items-center justify-between hidden sm:flex">
            <div>
                <div class="text-lg sm:text-2xl font-bold">{{ hotel.city }}</div>
                <div class="text-sm sm:text-base text-gray-normal">nga Tirana</div>
            </div>
            <div class="ml-auto text-right">
                <div class="text-lg sm:text-3xl font-bold">{{ Math.ceil(package.total_price / 2) }}€</div>
                <div class="text-gray-normal">personi</div>
            </div>
        </div>
        <div class="sm:border-t border-primary sm:mt-4 mb-5 py-3">
            <hotel-title :hotel_data="package.hotel_data" class="!mb-2 sm:mb-10 !text-sm border-b border-primary sm:border-b-0 pb-1 sm:pb-0 items-center sm:!text-2xl" :stars="false"/>
            <div class="flex flex-col sm:hidden gap-1">
                <div class="flex w-full gap-1">
                    <div class="text-lg font-bold">{{ Math.ceil(package.total_price / 2) }}€</div>

                    <div class="text-gray-normal">/ personi</div>
                </div>
                <div class="flex gap-1">
                    <div class="text-[#55C7F8]">
                        {{ formatDateSQ(package.hotel_data.check_in_date, 'dd LLLL') }}
                    </div>

                    <div class="text-gray-normal">
                        / {{ displayNights(package.hotel_data.number_of_nights) }}
                    </div>
                </div>
            </div>
            <div class="mt-4 hidden sm:flex justify-between">
                <div class="flex gap-1">
                    <div class="text-[#55C7F8]">
                        {{ formatDateSQ(package.hotel_data.check_in_date, 'dd LLLL') }}
                    </div>

                    <div class="text-gray-normal">
                        / {{ displayNights(package.hotel_data.number_of_nights) }}
                    </div>
                </div>
            </div>
        </div>
        <nuxt-link
            :to="`/search?origin_id=${origin}&destination_id=${package.hotel_data.hotel.destination_id}&nights=${package.hotel_data.number_of_nights}&checkin_date=${date}&page=1`"
            class="px-5 w-full absolute left-1/2 -translate-x-1/2 -bottom-3.5 sm:-bottom-5 flex justify-center"
        >
            <button-default class="uppercase flex gap-1 justify-center items-center text-center px-1 py-1.5 sm:py-4 w-full font-normal !text-sm !rounded-[5px] sm:text-base max-w-[150px] sm:max-w-[260px]">më shumë</button-default>
        </nuxt-link>
    </div>
</template>

<style scoped>

</style>
