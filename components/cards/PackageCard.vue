<template>
    <div ref="packageCard" class="min-h-[384px]">
        <div v-if="isVisible || alreadyShown" class="grid grid-cols-12 border-2 border-gray-normal rounded-[20px] sm:rounded-[30px] bg-white" >
            <transition name="page" @after-enter="toggleScroll(true)">
                <div v-if="expandImg" class="fixed top-0 left-0 z-[600] h-[100dvh] w-full">
                    <Collection :package="package" @closed="handleCollectionclose"/>
                </div>
            </transition>
            <div class="sm:p-7 col-span-12 md:col-span-9 lg:col-span-8 xl:col-span-5 md:bg-gray-lighter/30 xl:bg-transparent">
                <div class="relative w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[384px] rounded-t-[20px] sm:rounded-[20px] overflow-hidden">
                    <CornerInfo>
                        {{roomBasis}}
                    </CornerInfo>
                    <Carousel :slide-classes="['w-full h-full overflow-auto']" :options="packageImages">
                        <template #option="{option}">
                            <nuxt-img @click="() => {expandImg = true}" loading="lazy" width="583" height="400" format="webp" class="bg-gray-light w-full h-full object-cover cursor-pointer" :src="option" :alt="option"/>
                        </template>
                        <template #empty>
                            Nuk ka imazhe per këtë hotel
                        </template>
                    </Carousel>
                </div>
            </div>
            <div class="p-3 sm:p-7 col-span-12 sm:col-span-8 md:order-last md:col-span-11 lg:col-span-10 xl:order-none xl:col-span-5 2xl:col-span-4 flex flex-col">
                <div class="relative">
<!--                    <hotel-title :hotel_data="hotel_data" :stars="true" class="!mb-2"/>-->
                    <div class="text-2xl flex flex-col gap-3 font-bold mb-2">
                        <div class="flex justify-between items-center">
                            <HotelStars :stars="hotel_data.hotel.stars" class="base-text sm:text-2xl"/>
                            <trip-advisor :mobile="true" class="flex sm:hidden" :score="hotel_data.hotel.review_score" :count="hotel_data.hotel.review_count"/>
                        </div>
                        <div>
                            {{hotel_data.hotel?.name || '*No name*'}}
                        </div>
                    </div>
                    <div class="flex items-center mb-5 sm:mb-8 gap-1">
                        <nuxt-icon name="location" class="text-primary text-xl"/>
                        <div class="font-semibold text-xs sm:text-sm text-gray-hard">
                            {{hotel_data.hotel.address}}
                        </div>
                    </div>
<!--                    <div class="text-2xl flex justify-between font-bold mb-10">-->
<!--                        <div>-->
<!--                            HOTEL {{hotel_data.hotel?.name || '*No name*'}}-->
<!--                        </div>-->
<!--                        <HotelStars :stars="hotel_data.hotel.stars"/>-->
<!--                    </div>-->
                    <InfoTabs :package="package"/>
                </div>
            </div>
            <div class="flex flex-col pb-5 gap-2 sm:py-7 px-3 sm:px-5 sm:gap-0  justify-between sm:justify-between items-center col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-4 xl:col-span-2 2xl:col-span-3 md:bg-gray-lighter/30">
                <trip-advisor class="hidden sm:flex" :score="hotel_data.hotel.review_score" :count="hotel_data.hotel.review_count"/>
<!--                <trip-advisor class="hidden sm:flex"/>-->
                <div class="flex flex-col items-center">
                    <transition name="slide-up" mode="out-in">
                        <div :key="packagePrice + 'label'" class="text-center">
                            <div class="flex items-center gap-1 justify-center">
                                <div class="font-bold text-[36px] min-w-max lg:text-4xl">{{ Math.ceil(packagePrice) }}€</div>
                                <div class="text-lg text-gray-normal">{{ mainStore.priceMode ? 'Totali' : '/ Person' }}</div>
                            </div>
                            <div v-if="!mainStore.priceMode" class="mt-2 text-gray-normal hidden md:block">
                                Dhomë Dyshe
                            </div>
                        </div>
                    </transition>
                </div>
<!--                <nuxt-link :to="{path: '/package', query: {package: package.id}}" class="w-full">-->
                    <button-default @click="sendWhatsappMessage(package)" class="h-[50px] md:h-[70px] w-full font-normal">Kontakto Tani</button-default>
<!--                </nuxt-link>-->
                <BookKapar v-if="!kaparDisabled" class="w-full mt-2" :kapar="kapar"/>
                <LastUpdate :last-update="package.package_config.last_processed_at" class="mt-2"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import InfoTabs from "~/components/package/InfoTabs.vue";
import Carousel from "~/components/Carousel.vue";
import ButtonDefault from "~/components/ButtonDefault.vue";
import CornerInfo from "~/components/CornerInfo.vue";
import HotelStars from "~/components/HotelStars.vue";
import HotelTitle from "~/components/package/HotelTitle.vue";
import TripAdvisor from "~/components/package/TripAdvisor.vue";
import InfoPoint from "~/components/InfoPoint.vue";
import { differenceInDays } from 'date-fns';
import LastUpdate from "~/components/package/LastUpdate.vue";

const Collection = defineAsyncComponent(() => import("~/components/package/Collection.vue"));
const BookKapar = defineAsyncComponent(() => import("~/components/package/BookKapar.vue"));
const {displayNights, formatDateSQ, formatDurationSQ, roomBasisInfo, sendWhatsappMessage, removeTimezone} = useUtils();
const props = defineProps<{ package: FullPackage }>();

const mainStore = useMainStore()
const packageImages = mainStore.getPackageImages(props.package);
const expandImg = ref(false);

const hotel_data = computed(() => props.package.hotel_data)

const roomBasis = roomBasisInfo(hotel_data.value.room_basis);
const packageCard = ref(null);
const alreadyShown = ref(false);

const packagePrice = computed(() => {
    return !mainStore.priceMode ? Number(props.package.total_price) / 2 : props.package.total_price
})

const kapar = computed(() => {
    return !mainStore.priceMode ? Number(props.package.price_minus_hotel) / 2 : props.package.price_minus_hotel
})

const kaparDisabled = computed(() => {
    const days = differenceInDays(new Date(hotel_data.value.reservation_deadline), new Date());
    return days < 2;
})

const isVisible = useElementVisibility(packageCard);

watch(isVisible, (val) => {
    if(val){
        alreadyShown.value = true;
    }
})

const handleCollectionclose = () => {
    expandImg.value = false;
    // toggleScroll(false);
}
const toggleScroll = (value: boolean) => {
    if(value){
        document.body.classList.add('stopScroll')
    } else {
        document.body.classList.remove('stopScroll')
    }
}
</script>

<style>
.stopScroll {
    margin: 0;
    height: 100%;
    overflow: hidden;
}
</style>
