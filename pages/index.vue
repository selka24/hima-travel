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
    description: 'Agjensi Turistike Hima Trips. E Njohur si Agjensi Udhetimesh qe nga 2011 ofron Udhetime me Guide dhe Individuale. Oferta Turistike. Bileta Avioni. Paketa Turistike. Paketa all inclusive.',
    ogDescription: 'Agjensi Turistike Hima Trips. E Njohur si Agjensi Udhetimesh qe nga 2011 ofron Udhetime me Guide dhe Individuale. Oferta Turistike. Bileta Avioni. Paketa Turistike. Paketa all inclusive.',
    ogType: 'website',
    ogLocale: 'sq_AL',
    ogSiteName: 'Agjensi Turistike Hima Trips. E Njohur si Agjensi Udhetimesh qe nga 2011 ofron Udhetime me Guide dhe Individuale. Oferta Turistike. Bileta Avioni. Paketa Turistike. Paketa all inclusive.',
    ogImage: () => `${runtimeConfig.public.prodUrl}/images/red-logo.png`,
    ogImageWidth: '140',
    ogImageHeight: '56',
    ogImageType: 'image/png',
    twitterCard: "summary_large_image",
    twitterTitle: 'Agjensi Turistike Hima Trips. E Njohur si Agjensi Udhetimesh qe nga 2011 ofron Udhetime me Guide dhe Individuale. Oferta Turistike. Bileta Avioni. Paketa Turistike. Paketa all inclusive.',
    twitterDescription: 'Agjensi Turistike Hima Trips. E Njohur si Agjensi Udhetimesh qe nga 2011 ofron Udhetime me Guide dhe Individuale. Oferta Turistike. Bileta Avioni. Paketa Turistike. Paketa all inclusive.',
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
