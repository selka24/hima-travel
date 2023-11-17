<script setup>
// import defineAsyncComponent from "#speedkit/hydrate";
// import PreviewCard from "~/components/cards/PreviewCard.vue";
// import ZbuloBoten from "~/components/sections/ZbuloBoten.vue";
// import PreviewCardLoading from "~/components/cards/PreviewCardLoading.vue";
// import OfferDeparture from "~/components/OfferDeparture.vue";
const OfferDeparture = defineAsyncComponent(() => import('@/components/OfferDeparture.vue'));
const InspirationSection = defineAsyncComponent(() => import('@/components/sections/InspirationSection.vue'));
const ZbuloBoten = defineAsyncComponent(() => import('@/components/sections/ZbuloBoten.vue'))

useHead({
    title: 'Inspirohu'
})
</script>

<template>
    <div class="flex justify-center px-3.5 sm:px-5 lg:px-10">
        <div class="max-w-page w-full">
            <OfferDeparture class="!items-end justify-center mt-24 mb-16"/>
            <InspirationSection/>
<!--            <section v-if="loadingPackage" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 mt-20 max-w-page relative">-->
<!--                <preview-card-loading v-for="idx in 10" :key="idx + 'load'"/>-->
<!--            </section>-->
<!--            <section v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-28 mt-20 max-w-page relative">-->
<!--                <preview-card v-for="offer in mainStore.destinationOffers" :key="offer.id + 'prw-card'" :travel-package="offer"/>-->
<!--            </section>-->
<!--            <section class="mt-40">-->
<!--                <ZbuloBoten class="w-full"/>-->
<!--            </section>-->
        </div>
    </div>
</template>
<style lang="postcss" scoped>
.nuxt-speedkit-performance-issue-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 60%);
    backdrop-filter: blur(2px);
}
</style>
