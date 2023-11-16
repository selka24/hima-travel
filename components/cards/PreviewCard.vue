
<template>
    <div class="border border-gray-normal rounded-[15px] md:rounded-[30px] p-2 sm:p-7 relative">
        <div class="relative group overflow-hidden rounded-[10px] text-xl  sm:text-5xl text-white font-bold ">
            <nuxt-img format="webp"
                      v-if="travelPackage.destination_photos?.length"
                      class="transition-all ease-in duration-300 group-hover:scale-110 object-cover w-full min-h-[190px] md:min-h-[442px]"
                      width="385"
                      height="442"
                      :src="buildStorageUrl(travelPackage.destination_photos[0].file_path)"
                      :alt="`${travelPackage.city} picture`"
            />
            <div v-else class="bg-gray-normal w-full md:h-[442px] flex items-center justify-center">
            </div>
            <div class="hidden sm:flex flex-col justify-end items-center transition-all ease-in duration-300 opacity-0 group-hover:opacity-100 absolute w-full h-full bg-primary/70  backdrop-blur-[1px] top-0 rounded-[10px]">
                <div class="flex mb-8 items-center">
                    <nuxt-icon :name="'planeIco'" class="text-white text-[130px]"/>
                    +
                    <nuxt-icon :name="'hotel'" class="text-white text-[100px]"/>
                </div>
                <div class="mb-40 uppercase">
                    {{travelPackage.packages_count}} {{ travelPackage.packages_count === 1 ? 'ofertë' : 'oferta' }}
                </div>
            </div>
            <div class="transition-all ease-in duration-300 uppercase absolute bottom-1/2 left-1/2 -translate-x-1/2 sm:group-hover:bottom-24">
                {{travelPackage.city}}
            </div>
        </div>
        <div class="flex mt-3 mb-6 sm:mt-11 items-center justify-between sm:mb-12">
            <div class="hidden sm:block">
                <div class="text-2xl font-bold">{{travelPackage.city}}</div>
                <div class="text-gray-normal">{{travelPackage.packages_count}} {{ travelPackage.packages_count === 1 ? 'Ofertë' : 'Oferta' }}</div>
            </div>
            <div class="flex w-full justify-between items-center sm:items-start sm:w-auto sm:justify-start sm:block text-right">
                <div class="text-xl sm:text-3xl font-bold">{{pricePP}}€</div>
                <div class="text-gray-normal">personi</div>
            </div>
        </div>
<!--        <div class="mt-11 font-bold text-lg mb-12">-->
<!--            {{travelPackage.description}}-->
<!--        </div>-->
        <nuxt-link :to="`/recommendations?destinationId=${travelPackage.id}`" class="px-5 w-full absolute left-1/2 -translate-x-1/2 -bottom-3.5 sm:-bottom-5 flex justify-center">
            <button-default class="uppercase flex gap-1 justify-center items-center text-center px-1 py-1.5 sm:py-4 w-full font-normal !text-sm !rounded-[5px] sm:text-base max-w-[150px] sm:max-w-[260px]">
                <span class="hidden sm:block">zbulo</span>
                <nuxt-icon name="eye-solid" class="text-lg text-white block sm:hidden"/>
                <span>ofertat</span>
            </button-default>
        </nuxt-link>
    </div>
</template>
<script setup lang="ts">
import ButtonDefault from "~/components/ButtonDefault.vue";

const props = defineProps<{travelPackage: TravelOffer}>();
const {buildStorageUrl} = useUtils();

const pricePP = computed(() => {
    if(props.travelPackage.packages_min_total_price){
        return Math.ceil(Number(props.travelPackage.packages_min_total_price) / 2);
    }
    return 'null';
})
</script>
