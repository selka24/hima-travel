<template>
    <div class="flex flex-col justify-center items-center">
        <div class="relative bg-right-bottom bg-cover pt-24 pb-10 px-3.5 sm:px-5 lg:px-10 w-full min-h-[286px]" :style="backgroundStyles">
            <div class="bg-gradient-to-r from-black/20 absolute w-full h-full left-0 top-0 z-0"/>
            <div class="flex justify-center">
                <TravelSearch class="max-w-page w-full"/>
            </div>
        </div>
        <div id="resultsSection" ref="resultsSection" class="flex flex-col items-center justify-center w-full px-3.5 sm:px-5 lg:px-10">
            <SearchFilters class="max-w-page mt-11"/>
            <div class="flex flex-col gap-10 max-w-screen-2xl w-full mt-10">
<!--                <TellUs/>-->
                <transition-group name="fade">
                    <div v-if="mainStore.loadingPackages" class="flex flex-col gap-y-10">
                        <PackageCardLoading v-for="idx in 3" :key="idx + 'load'"/>
                    </div>
                    <div v-else-if="mainStore.travelPackages" class="flex flex-col gap-y-10">
                            <PackageCard v-for="travelPackage in mainStore.travelPackages" :package="travelPackage" :key="travelPackage.id" class="relative"/>
                        <div class="flex w-full justify-center">
                            <Pagination :per-page="10" :count="mainStore.searchTotal" :curr-page="mainStore.selectedPage" @page-changed="handlePageChanged"/>
                        </div>
                    </div>
                    <div v-else class="mt-10 flex justify-center items-center">
                        <div class="text-center text-secondary font-semibold">
                            <div v-if="errors.length" class="flex flex-col gap-5 text-3xl text-primary text-left">
<!--                                <div v-for="error in errors">-->
<!--                                    {{error}}!-->
<!--                                </div>-->
                                <div class="mt-5 text-secondary">
                                    Kontrolloni parametrat e kerkimit
                                </div>
                            </div>
                            <div v-else class="text-5xl leading-loose">
                                Nuk u gjend asnje pakete udhetimi!
                                <br>
                                Provoni te ndryshoni parametrat e kerkimit.
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script setup>
import {useQueryValidator} from "~/composables/queryValidator.js";
// import JsonViewer from 'vue-json-viewer'
const runtimeConfig = useRuntimeConfig()

useSeoMeta({
    title: 'Kërko paketa',
    ogTitle: 'Kërko paketa',
    description: 'Kerko paketa udhetimi. Paketa turistike. Agjensi Turistike Hima Trips.',
    ogDescription: 'Kerko paketa udhetimi. Paketa turistike. Agjensi Turistike Hima Trips.',
    ogType: 'website',
    ogLocale: 'sq_AL',
    ogSiteName: 'Bileta Avioni Hima Trips',
    ogImage: () => `${runtimeConfig.public.prodUrl}/images/red-logo.png`,
    ogImageWidth: '140',
    ogImageHeight: '56',
    ogImageType: 'image/png'
})

// import TellUs from "~/components/sections/TellUs.vue";
import SearchFilters from "~/components/SearchFilters.vue";
import TravelSearch from "~/components/TravelSearch.vue";
const PackageCardLoading = defineAsyncComponent(() => import('/components/cards/PackageCardLoading.vue'));
const PackageCard = defineAsyncComponent(() => import('/components/cards/PackageCard.vue'))
const Pagination = defineAsyncComponent(() => import('/components/Pagination.vue'))

const mainStore = useMainStore();
const resultsSection = ref(null)


const {isInViewport} = useUtils();
const {invalid, validParams, handleQueryValidate, errors} = useQueryValidator()
const route = useRoute();
const router = useRouter();

const img = useImage();

const {nights, checkin_date, origin_id, destination_id} = route.query


const scrollToResults = () => {
    if (!isInViewport(resultsSection.value)) {
        resultsSection.value.scrollIntoView({
            behavior: 'smooth'
        })
    }
}

const handlePageChanged = (page) => {
    mainStore.selectedPage = page;
    router.push({path: '/search', query: {...mainStore.getSearchParams, page}})
}

const setSearchValues = async () => {
    handleQueryValidate();

    if(invalid.value) {
        mainStore.loadingPackages = false;
    } else {
        if(!mainStore.allOrigins.length){
            await mainStore.actGetOrigins();
        }
        const origin = mainStore.allOrigins.find(o => o.id === validParams.origin_id);
        if(origin){
            mainStore.actSetOrigin(origin);
            await mainStore.actGetDestinations();

            const destination = mainStore.allDestinations.find(o => o.id === validParams.destination_id);
            if(destination){
                mainStore.originSearch = origin.name;
                mainStore.actSetDestination(destination)
                mainStore.destinationSearch = destination.name;
                mainStore.selectedDate = validParams.checkin_date;
                mainStore.selectedNights = validParams.nights;
                mainStore.selectedPage = validParams.page;
            }
        }
        await mainStore.actGetPackagesSearch();
    }
    nextTick(() => {
        scrollToResults();
    })
}


onBeforeUnmount(() => {
    //set to true to prevent double mount for the children component
    //when loading value changes when navigating back to search page
    mainStore.loadingPackages = true;
})

onMounted(() => {
    setSearchValues();
})


const backgroundStyles = computed(() => {
    const imgUrl = img('/images/bg-image2.png', { width: 1999, height:290, quality: 70, format: 'webp' })
    return { backgroundImage: `url('${imgUrl}')` }
})

watch(() => route.fullPath, () => {
    setSearchValues();
})


definePageMeta({
    layoutTransition: {
        name: 'page',
        mode: 'out-in',
        onAfterEnter: () => {
            const el = document.getElementById('resultsSection');
            el.scrollIntoView({behavior: 'smooth'});
        }
    },
    pageTransition: {
        name: 'page',
        mode: 'out-in',
        onAfterEnter: () => {
            const el = document.getElementById('resultsSection');
            el.scrollIntoView({behavior: 'smooth'});
        }
    }
})
</script>

<style scoped>

</style>
