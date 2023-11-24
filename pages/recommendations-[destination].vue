<script setup lang="ts">
import OfferCard from "~/components/cards/OfferCard.vue";
import PreviewCardLoading from "~/components/cards/PreviewCardLoading.vue";

const runtimeConfig = useRuntimeConfig()
const ogNuxtImage = useImage()
const route = useRoute();
const mainStore = useMainStore();
const {params} = route;
const loading = ref(true);

const getRecommends = async () => {
    if(params.destination){
        const id = Number(params.destination)
        if(!isNaN(id)){
            await mainStore.actGetDestinationPackages(id);
        } else {
            alert(`Destination id is not correct: ${id}`)
        }
    }
    loading.value = false;
}

const destination = computed(() => {
    const allDestination = mainStore.allDestinations;
    if(allDestination){
        return  allDestination.find(x => x.id === Number(params.destination));
    }
    return null
})

const getDestinationInfo = async () => {
    if(mainStore.allOrigins?.length){
        mainStore.actSetOrigin(mainStore.allOrigins[0]);
        await mainStore.actGetDestinations();
    }
}


const getOGImage = () => {
    const {srcset} = ogNuxtImage.getSizes(`${runtimeConfig.public.storageUrl}/${destination.value?.destination_photos[0].file_path}`, {
        modifiers: {
            format: 'webp',
            quality: 70,
            width: 1200,
            height: 630,
            fit: 'cover'
        }
    })

    const imageUrl = srcset.split(' ')[0]

    if(process.env.NODE_ENV === 'development'){
        return `localhost:3001${imageUrl}`;
    }
    return `${runtimeConfig.public.prodUrl}${imageUrl}`;
}

if(process.server){
    await getDestinationInfo();
} else if (!mainStore.allDestinations.length){
    await getDestinationInfo();
}

onMounted(() => {
    getRecommends();
})

useSeoMeta({
    title: () => `Udhëtim në ${destination.value?.name || 'Error Destination'}`,
    ogTitle: () => `Udhëtim në ${destination.value?.name || 'Error Destination'}`,
    ogUrl: () => `${runtimeConfig.public.prodUrl}`,
    description: 'Perfitoni Nga Ofertat e udhetimit me HimaTrips',
    ogDescription: 'Perfitoni Nga Ofertat e udhetimit me HimaTrips',
    ogType: 'website',
    ogLocale: 'sq_AL',
    ogSiteName: 'Perfitoni Nga Ofertat e udhetimit me HimaTrips',
    ogImage: () => getOGImage(),
    ogImageWidth: '1200',
    ogImageHeight: '630',
    ogImageType: 'image/jpeg',
    twitterCard: "summary_large_image",
    twitterTitle: 'Perfitoni Nga Ofertat e udhetimit me HimaTrips',
    twitterDescription: 'Perfitoni Nga Ofertat e udhetimit me HimaTrips',
    twitterSite: '@HimaTravel',
    twitterImage:  () => getOGImage(),
})
</script>

<template>
    <div class="flex flex-col items-center px-3.5 sm:px-5 lg:px-10 mt-11">
        <div class="flex items-center">
            <div class="text-3xl">Udhëtim në</div>
            <div class="text-primary text-4xl ml-3 font-bold">{{ destination?.name || 'Destinacioni nuk ekziston' }}</div>
        </div>
        <div v-if="loading" class="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 max-w-page mt-11">
            <PreviewCardLoading v-for="idx in 6" :key="idx + 'rec'"/>
        </div>
        <div v-else class="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 max-w-page w-full mt-11">
            <OfferCard v-for="(pckg, date) in mainStore.destinationPackages" :key="date" :date="date" :package="pckg" :sqDestination="destination?.name"/>
        </div>
    </div>
</template>

<style scoped>

</style>
