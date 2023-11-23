<script setup lang="ts">
import PreviewCard from "~/components/cards/PreviewCard.vue";
import OfferDeparture from "~/components/OfferDeparture.vue";
const mainStore = useMainStore()

// if(process.server){
//     await mainStore.actGetHomeDestinations();
//     mainStore.fromServer = true;
// }

onMounted(() => {
    // if(!mainStore.fromServer)
        mainStore.actGetHomeDestinations();
    // mainStore.fromServer = false;
})

const filteredOffers = computed(() => {
    return mainStore.destinationOffers.filter((d) => d.packages_min_total_price !== null)
})


</script>

<template>
    <div class="flex flex-col items-center px-3.5 sm:px-5 lg:px-10">
        <OfferDeparture class="my-20"/>
        <div class="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 mt-8 max-w-page">
            <preview-card v-for="offer in filteredOffers" :key="offer.id + 'prw-card'" :travel-package="offer"/>
        </div>
        <nuxt-link to="/inspiration?origin=Tirana"
                   class="mt-20 sm:mt-44 font-normal border border-primary text-center w-full max-w-[300px] py-5 rounded-[10px]">
            VIEW ALL DEALS
        </nuxt-link>
    </div>
</template>

<style scoped>

</style>
