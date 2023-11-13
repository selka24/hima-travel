
<template>
    <div class="border border-gray-normal rounded-[30px] p-7 relative">
        <div class="relative group overflow-hidden rounded-[10px] text-3xl  sm:text-5xl text-white font-bold ">
            <nuxt-img format="webp"
                      v-if="travelPackage.destination_photos?.length"
                      class="transition-all ease-in duration-300 group-hover:scale-110 object-cover w-full min-h-[442px]"
                      width="385"
                      height="442"
                      :src="buildStorageUrl(travelPackage.destination_photos[0].file_path)"
                      :alt="`${travelPackage.city} picture`"
            />
            <div v-else class="bg-gray-normal w-full h-[442px] flex items-center justify-center">
            </div>
            <div class="flex flex-col justify-end items-center transition-all ease-in duration-300 opacity-0 group-hover:opacity-100 absolute w-full h-full bg-primary/70  backdrop-blur-[1px] top-0 rounded-[10px]">
                <nuxt-icon :name="'roma'" filled class="text-[150px] mb-8"/>
                <div class="mb-40">
                    {{travelPackage.packages_count}} OFERTA
                </div>
            </div>
            <div class="transition-all ease-in duration-300 uppercase absolute bottom-1/2 left-1/2 -translate-x-1/2 group-hover:bottom-24">
                {{travelPackage.city}}
            </div>
        </div>
        <div class="flex mt-11 items-center">
            <div>
                <div class="text-2xl font-bold">{{travelPackage.city}}</div>
                <div class="text-gray-normal">{{travelPackage.packages_count}} Oferta</div>
            </div>
            <div class="ml-auto text-right">
                <div class="text-2xl sm:text-3xl 2xl:text-5xl font-bold">{{pricePP}}€</div>
                <div class="text-gray-normal">personi</div>
            </div>
        </div>
        <div class="mt-11 font-bold text-lg mb-12">
            {{travelPackage.description}}
        </div>
        <nuxt-link :to="`/recommend?destinationId=${travelPackage.id}`">
            <button-default class="uppercase px-8 py-4 font-normal absolute left-1/2 -translate-x-1/2">zbulo ofertën</button-default>
        </nuxt-link>
    </div>
</template>
<script setup lang="ts">
import ButtonDefault from "~/components/ButtonDefault.vue";

const props = defineProps<{travelPackage: TravelOffer}>();
const {buildStorageUrl} = useUtils();

const pricePP = computed(() => {
    if(props.travelPackage.packages_min_total_price){
        return (Number(props.travelPackage.packages_min_total_price) / 2).toFixed(2);
    }
    return 'null';
})
</script>
