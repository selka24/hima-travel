<script setup lang="ts">
// import defineAsyncComponent from '#speedkit/hydrate';
const HomeIntro = defineAsyncComponent(() => import('@/components/sections/HomeIntro.vue'));
const OffersSection = defineAsyncComponent(() => import('@/components/sections/OffersSection.vue'));
const WelcomeSection = defineAsyncComponent(() => import('@/components/sections/WelcomeSection.vue'));

// const WelcomeSection = useLazyLoadComponentIfVisible({
//     componentLoader: () => import('@/components/sections/WelcomeSection.vue'),
//     loadingComponent: ButtonDefault,
// });
const {actResetParams} = useMainStore()
const runtimeConfig = useRuntimeConfig()
definePageMeta({
    layout: 'home'
})

useSeoMeta({
    title: 'Rezervo Destinacionin tuaj te preferuar me HimaTrips.com',
    ogTitle: 'Rezervo Destinacionin tuaj te preferuar me HimaTrips.com',
    ogUrl: () => `${runtimeConfig.public.prodUrl}`,
    description: 'Perfitoni Nga Ofertat e udhetimit me HimaTrips',
    ogDescription: 'Perfitoni Nga Ofertat e udhetimit me HimaTrips',
    ogType: 'website',
    ogLocale: 'sq_AL',
    ogSiteName: 'Perfitoni Nga Ofertat e udhetimit me HimaTrips',
    ogImage: () => `${runtimeConfig.public.prodUrl}/images/ogImage.png`,
    ogImageWidth: '1200',
    ogImageHeight: '630',
    ogImageType: 'image/png',
    twitterCard: "summary_large_image",
    twitterTitle: 'Perfitoni Nga Ofertat e udhetimit me HimaTrips',
    twitterDescription: 'Perfitoni Nga Ofertat e udhetimit me HimaTrips',
    twitterSite: '@HimaTravel',
    twitterImage: () => `${runtimeConfig.public.prodUrl}/images/ogImage.png`,
})
actResetParams();
</script>
<template>
    <div>
        <HomeIntro />
        <OffersSection class="mt-8" id="OffersSection"/>
        <WelcomeSection class="mt-40 sm:mt-80"/>
    </div>
</template>

<style scoped>

</style>
