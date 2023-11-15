<script setup lang="ts">
// import defineAsyncComponent from '#speedkit/hydrate';

const HomeIntro = defineAsyncComponent(() => import('@/components/sections/HomeIntro.vue'));
const OffersSection = defineAsyncComponent(() => import('@/components/sections/OffersSection.vue'));
const WelcomeSection = defineAsyncComponent(() => import('@/components/sections/WelcomeSection.vue'));

const {actResetParams} = useMainStore()
const runtimeConfig = useRuntimeConfig()
definePageMeta({
    layout: 'home'
})

useSeoMeta({
    title: 'Hima Trips',
    ogTitle: 'Agjensi Turistike Hima Trips. E Njohur si Agjensi Udhetimesh qe nga 2011 ofron Udhetime me Guide dhe Individuale. Oferta Turistike. Bileta Avioni. Paketa Turistike. Paketa all inclusive.',
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
        <HomeIntro critical/>
        <OffersSection class="mt-32" id="OffersSection"/>
        <WelcomeSection class="mt-80"/>
    </div>
</template>

<style scoped>

</style>
