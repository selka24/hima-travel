<template>
    <div class="flex w-full justify-center mt-24 px-7 lg:px-10">
        <div class="flex flex-col max-w-screen-lg w-full" v-if="!mainStore.loadingCurrPackage && mainStore.currTravelPackage">
<!--                <client-only>-->
<!--                    <dev-only>-->
<!--                        <json-viewer-->
<!--                            :value="currTravelPackage"-->
<!--                            :expand-depth=5-->
<!--                            copyable-->
<!--                            boxed></json-viewer>-->
<!--                    </dev-only>-->
<!--                </client-only>-->
            <div class="text-3xl font-bold mb-10">
                HOTEL {{hotel?.name}}
            </div>
            <div class="grid grid-cols-9 mb-4 gap-7">
                <div v-if="expandImg" class="fixed top-0 bottom-0 right-0 left-0 bg-gray-normal/80 z-[500] backdrop-blur-[5px]">
                </div>
                <div :class="['flex flex-col col-span-9 md:col-span-6', {'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[80vh] scale-100 z-[600] w-[90%] sm:w-[80%] max-w-page' : expandImg}]">
                    <div @click="toggleExpand"
                         v-if="expandImg"
                         class="absolute right-0 -top-11 sm:-right-9 sm:-top-9 cursor-pointer flex items-center justify-center bg-white/80 rounded-full p-2">
                        <nuxt-icon name="close" class="text-xl" filled/>
                    </div>
                    <div class="rounded-[20px] overflow-hidden min-h-[500px] h-full mb-4 relative">
                        <Carousel @slide-change="handleSlideChange"
                                  :slide-classes="['w-full h-full']"
                                  :current-slide="currImg"
                                  :options="packageImages">
                            <template #option="{option}">
                                <nuxt-img @click="() => {if(!expandImg) expandImg = true}"
                                          width="700" height="500"
                                          loading="lazy"
                                          format="webp"
                                          :class="['bg-gray-light w-full h-full object-cover', {'cursor-pointer': !expandImg}]"
                                          :src="option"
                                          :alt="'hotel photo'"
                                />
                            </template>
                            <template #empty>
                                Nuk ka imazhe per kete hotel
                            </template>
                        </Carousel>
                    </div>
                    <SmallPictures
                        class=""
                        :images="packageImages"
                        @image-change="handleSlideChange"
                        :curr-image="currImg"
                    />
                </div>
                <div class="col-span-9 md:col-span-3">
                    <InfoCard class="h-full max-h-[500px]"/>
                </div>
            </div>
            <div class="mt-16 grid grid-cols-9">
                <div class="col-span-9 md:col-span-6 overflow-hidden">
                    <InfoTabs bgTriangle="bg-gray-lighter" :package="mainStore.currTravelPackage"/>
                </div>
            </div>
            <ZbuloBoten class="mt-28"/>
            <div class="mt-14">
                <div class="text-3xl mb-12 font-bold">Introduction Hotel Filan Fisteku</div>
                <div>
                    Modern, stylish, and sparkling in four-star glory, magical Majorcan getaways start right here at Globales Palmanova. Just a short distance from the resort centre and the beach, this well-placed base makes it easy to spend your days unwinding or exploring. It also offers a choice of Half Board and All Inclusive. Looking for a special stay? Opt for a room with VIP service for access to an adults-only terrace complete with Bali beds. When it comes to family facilities, there’s a children’s playground and a kids’ club. An exciting entertainment programme awaits too. Feeling competitive? Check out the pool table and table tennis!
                </div>
            </div>
            <div class="mt-14">
                <div class="text-3xl mb-12 font-bold">Location</div>
                <div class="rounded-[20px] overflow-hidden h-[390px]">
                    <client-only>
                        <iframe
                            loading="lazy"
                            width="100%"
                            height="100%"
                            :src="`https://maps.google.com/maps?q=${place}&hl=en&z=15&amp;output=embed`"
                        ></iframe>
                    </client-only>
                </div>
            </div>
            <div class="mt-14">
                <div class="text-3xl mb-12 font-bold">Room types</div>
                <room-info/>
            </div>
            <div class="mt-14">
                <div class="text-3xl mb-12 font-bold">Contact us to book</div>
                <BookCard/>
            </div>
        </div>
        <div v-else-if="mainStore.loadingCurrPackage" class="mt-10 flex justify-center items-center">
            <div class="text-center text-secondary text-5xl font-semibold leading-loose">
                LOADING...
            </div>
        </div>
        <div v-else class="mt-10 flex justify-center items-center">
            <div class="text-center text-secondary text-5xl font-semibold leading-loose">
               Kjo pakete nuk ekziston
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SmallPictures from "~/components/SmallPictures.vue";
import InfoCard from "~/components/cards/InfoCard.vue";
import ZbuloBoten from "~/components/sections/ZbuloBoten.vue";
import BookCard from "~/components/cards/BookCard.vue";
import InfoTabs from "~/components/package/InfoTabs.vue";
// import JsonViewer from 'vue-json-viewer';

const mainStore = useMainStore();
const {currTravelPackage} = toRefs(mainStore);
const {query} = useRoute();
const currImg = ref(0);
const expandImg = ref(false)

const handleSlideChange = (slide: number) => {
    currImg.value = slide;
}

const hotel = computed(() => {
    return currTravelPackage.value?.hotel_data.hotel
})

const toggleExpand = () => {
    expandImg.value = !expandImg.value
}

const packageImages = computed(() => mainStore.getPackageImages(currTravelPackage.value))

// const coordinates = computed(() => {
//     return [hotel.value.latitude, hotel.value.longitude]
// })

const place = computed(() => {
    return `${hotel.value?.name.replace(/\s+/g, '+')}+${hotel.value?.address.replace(/\s+/g, '+')}`
})


const getPackage = async () => {
    if(query?.package && !isNaN(Number(query.package))){
        await mainStore.actGetPackageById(query.package);
    } else {
        mainStore.loadingCurrPackage = false;
        console.error('Invalid package id parameter')
    }
}

onMounted(() => {
    getPackage();
})
</script>

<style scoped>

</style>
