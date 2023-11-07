<template>
    <div class="flex flex-col justify-center items-center">
        <div class="relative bg-right-bottom bg-cover pt-24 pb-10 px-5 lg:px-10 w-full min-h-[286px]" :style="backgroundStyles">
            <div class="bg-gradient-to-r from-black/20 absolute w-full h-full left-0 top-0 z-0"/>
            <div class="flex justify-center">
                <TravelSearch class="max-w-page w-full"/>
            </div>
        </div>
        <div id="resultsSection" ref="resultsSection" class="flex flex-col items-center justify-center w-full px-5 lg:px-10">
            <SearchFilters class="max-w-page mt-11"/>
            <div class="flex flex-col gap-10 max-w-screen-2xl w-full mt-10">
                <TellUs/>
                <transition-group name="fade">
                    <div v-if="mainStore.loadingPackages" class="flex flex-col gap-y-10">
                        <LazyCardsPackageCardLoading v-for="idx in 10" :key="idx + 'load'"/>
                    </div>
                    <div v-else-if="mainStore.travelPackages" class="flex flex-col gap-y-10">
                        <div v-for="travelPackage in mainStore.travelPackages" :key="travelPackage.id" class="relative">
                            <LazyCardsPackageCard :package="travelPackage"/>
                        </div>
                        <div class="flex w-full justify-center">
                            <LazyPagination :per-page="10" :count="mainStore.searchTotal" :curr-page="mainStore.selectedPage" @page-changed="handlePageChanged"/>
                        </div>
<!--                        <client-only>-->
<!--                            <json-viewer-->
<!--                                :value="mainStore.travelPackages"-->
<!--                                :expand-depth=5-->
<!--                                copyable-->
<!--                                boxed></json-viewer>-->
<!--                        </client-only>-->
                    </div>
                    <div v-else class="mt-10 flex justify-center items-center">
                        <div class="text-center text-secondary font-semibold">
                            <div v-if="errors.length" class="flex flex-col gap-5 text-3xl text-primary text-left">
                                <div v-for="error in errors">
                                    {{error}}!
                                </div>

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
import TellUs from "~/components/sections/TellUs.vue";
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
    console.log(page, 'pageee')
    mainStore.selectedPage = page;
    router.push({path: '/search', query: {...mainStore.getSearchParams, page}})
}

const setSearchValues = async () => {
    handleQueryValidate();

    if(invalid.value) {
        mainStore.loadingPackages = false;
        console.log('invalid search')
    } else {
        if(!mainStore.allOrigins.length){
            console.log('getting dataaa origin')
            await mainStore.actGetOrigins();
        }

        mainStore.selectedDate = validParams.checkin_date;
        mainStore.selectedNights = validParams.nights;
        mainStore.selectedPage = validParams.page;

        const origin = mainStore.allOrigins.find(o => o.id === validParams.origin_id);
        if(origin){
            mainStore.actSetOrigin(origin);
            mainStore.originSearch = origin.name
            mainStore.allDestinations = origin.destinations;
        }

        const destination = mainStore.allDestinations.find(o => o.id === validParams.destination_id);

        if(destination){
            mainStore.actSetDestination(destination || null)
            mainStore.destinationSearch = destination.name
        }
        await mainStore.actGetPackagesSearch();
    }
    scrollToResults();
}

if(process.server){
    await mainStore.actGetOrigins();
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
        onEnter: () => {
            //scroll to the results when transition finishes
            const el = document.getElementById('resultsSection');
            if (el.getBoundingClientRect().top !== 0)
                el.scrollIntoView({behavior: 'smooth'});
        },
    }
})
</script>

<style scoped>

</style>
