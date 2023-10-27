<template>
    <div class="flex w-full justify-center mt-24 px-5 lg:px-10">
        <div class="flex flex-col max-w-screen-lg w-full">

            <client-only>
                <json-viewer
                    :value="currTravelPackage"
                    :expand-depth=5
                    copyable
                    boxed></json-viewer>
            </client-only>
            <div class="text-3xl font-bold mb-10">
                Udhëtimi juaj drejt Parisit - {{params?.package}}
            </div>
            <div class="grid grid-cols-9 mb-4 gap-7">
                <div class="flex flex-col col-span-9 md:col-span-6">
                    <div class="rounded-[20px] overflow-hidden min-h-[500px] mb-4">
                        <Carousel @slide-change="handleSlideChange"
                                  :slide-classes="['w-full h-full']"
                                  :current-slide="currImg"
                                  :options="packageImages">
                            <template #option="{option}">
                                <nuxt-img width="700" height="500" loading="lazy" format="webp" class="w-full h-full object-cover" :src="option" :alt="'hotel photo'"/>
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
                <ArrowTabs @tab-change="handleTabChange"
                           :tabs="tabs"
                           bg-triangle="bg-gray-lighter"
                           :active-tab="activeTab"
                           class="mb-16 col-span-9 md:col-span-5">
                    <template #default="{tab}">
                        <div class="flex justify-center">
                            <div class="hidden sm:flex items-center gap-2">
                                <nuxt-icon :name="tab.icon"/>
                                {{tab.title}}
                            </div>
                            <nuxt-icon :name="tab.icon" class="block sm:hidden mb-2"/>
                        </div>
                    </template>
                </ArrowTabs>
                <div class="col-span-9 flex flex-wrap gap-x-4 justify-between gap-y-10">
                    <div v-for="ind in 3" :key="ind + 'ind'" class="flex flex-col gap-y-3.5">
                        <div v-for="(icon, idx) in icons" class="flex gap-4 items-center">
                            <nuxt-icon :name="icon" filled class="text-2xl"/>
                            <div class="font-bold">{{ sampleInfo[idx] }}</div>
                        </div>
                    </div>
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
    </div>
</template>
<script setup lang="ts">
import SmallPictures from "~/components/SmallPictures.vue";
import InfoCard from "~/components/cards/InfoCard.vue";
import ZbuloBoten from "~/components/sections/ZbuloBoten.vue";
import BookCard from "~/components/cards/BookCard.vue";
import JsonViewer from "vue-json-viewer/vue-json-viewer";

const mainStore = useMainStore();
const {currTravelPackage} = toRefs(mainStore);
const runtimeConfig = useRuntimeConfig()
const {params} = useRoute();

const currImg = ref(0);
const handleSlideChange = (slide: number) => {
    currImg.value = slide;
}

const hotel = computed(() => {
    return currTravelPackage.value.hotel_data.hotel
})

const packageImages = mainStore.getPackageImages(currTravelPackage.value)

// const coordinates = computed(() => {
//     return [hotel.value.latitude, hotel.value.longitude]
// })

const place = computed(() => {
    return `${hotel.value.name.replace(/\s+/g, '+')}+${hotel.value.address.replace(/\s+/g, '+')}`
})

const icons = ['calendar', 'suitcase', 'backpack', 'bed', 'food', 'info']
const tabs = [
    {title: 'Udhëtimi', icon: 'backpack'},
    {title: 'Hoteli', icon: 'food'},
    {title: 'Location', icon: 'suitcase'},
    {title: 'Dhoma', icon: 'bed'},
];
const sampleInfo = [
    '5 Netë, e Mar, 20 Shtator 2022',
    'Valixhe deri në 22 kg',
    'Çanë shpine deri në 22 kg',
    '1 x Dhomë dyshe',
    'Mëngjesi i përfshirë',
    'Info',
]
const activeTab = ref(0);
const handleTabChange = (tab: number) => {
    activeTab.value = tab;
}

if(process.server){
    if(params?.package){
        await mainStore.actGetPackageById(params.package);
    }
}
</script>

<style scoped>

</style>
