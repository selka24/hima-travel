<script setup lang="ts">
import PreviewCard from "~/components/cards/PreviewCard.vue";
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


</script>

<template>
    <div class="flex flex-col items-center px-5 lg:px-10">
        <div class="flex items-center max-w-page">
            <div class="text-[32px]">Ofertat më poshtë janë me nisje nga</div>
            <div class="text-primary text-4xl ml-7 font-bold">Tirana</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 mt-20 max-w-page">
            <preview-card v-for="offer in mainStore.destinationOffers" :key="offer.id + 'prw-card'" :travel-package="offer"/>
        </div>
        <nuxt-link to="/inspiration"
                   class="mt-44 font-normal border border-primary px-36 py-5 rounded-[10px]">
            VIEW ALL DEALS
        </nuxt-link>
    </div>
</template>

<style scoped>

</style>
