<template>
    <div class="grid grid-cols-12 border-2 border-gray-normal rounded-[30px] bg-white">
        <div class="p-7 col-span-12 md:col-span-9 lg:col-span-8 xl:col-span-5 md:bg-gray-lighter/30 xl:bg-transparent">
            <div class="relative w-full h-full min-h-[384px] rounded-[20px] overflow-hidden">
                <CornerInfo>
                    {{roomBasis}}
                </CornerInfo>
                <Carousel :slide-classes="['w-full h-full']" :options="packageImages">
                    <template #option="{option}">
                        <nuxt-img loading="lazy" format="webp" class="w-full h-full object-cover" :src="option" :alt="option"/>
                    </template>
                    <template #empty>
                        Nuk ka imazhe per këtë hotel
                    </template>
                </Carousel>
            </div>
        </div>
        <div class="overflow-hidden p-7 col-span-12 sm:col-span-8 md:order-last md:col-span-11 lg:col-span-10 xl:order-none xl:col-span-4 flex flex-col">
            <div class="overflow-hidden">
                <div class="text-3xl font-bold mb-10">HOTEL {{hotel_data.hotel.name}}</div>
                <InfoTabs :package="package"/>
            </div>
        </div>
        <div class="flex py-7 gap-5 sm:gap-0- sm:py-0 justify-between sm:flex-col sm:justify-center items-center col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-4 xl:col-span-3 px-5 md:bg-gray-lighter/30">
            <div class="flex flex-col items-center sm:mt-auto sm:mb-20">
                <div class="mb-2 text-lg text-gray-normal">Për person</div>
                <transition name="slide-up" mode="out-in">
                    <div :key="packagePrice" class="font-bold text-[36px] min-w-max lg:text-[55px]">{{ packagePrice }} €</div>
                </transition>
            </div>
            <nuxt-link :to="`/package/${package.id}`" class="max-w-[260px] w-full">
                <button-default class="h-[70px] w-full sm:mb-14 font-normal">Më shumë</button-default>
            </nuxt-link>
        </div>
    </div>
</template>
<script setup lang="ts">
import InfoTabs from "~/components/package/InfoTabs.vue";
const {displayNights, formatDateSQ, formatDurationSQ, roomBasisInfo} = useUtils();
const props = defineProps<{ package: FullPackage }>();

const mainStore = useMainStore()
const packageImages = mainStore.getPackageImages(props.package);

const hotel_data = props.package.hotel_data

const roomBasis = roomBasisInfo(hotel_data.room_basis);

const packagePrice = computed(() => {
    return !mainStore.priceMode ? props.package.total_price : JSON.parse(props.package.total_price) * 2
})
</script>

<style scoped>

</style>
