<script setup lang="ts">
import PreviewCard from "~/components/cards/PreviewCard.vue";
import PreviewCardLoading from "~/components/cards/PreviewCardLoading.vue";
const mainStore = useMainStore();


onMounted(() => {
    mainStore.actGetInspiration();
})
</script>

<template>
    <div class="w-full">
        <div v-if="mainStore.loadingInspiration" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 mt-20 max-w-page relative">
            <preview-card-loading v-for="idx in 6" :key="idx + 'load'"/>
        </div>
        <div v-else class="grid grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 mt-20 max-w-page relative">
            <preview-card v-for="offer in mainStore.destinationOffers" :key="offer.id + 'prw-card'" :travel-package="offer"/>
        </div>
    </div>
</template>

<style scoped>

</style>
