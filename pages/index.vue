<script setup lang="ts">
import speedkitHydrate from '#speedkit/hydrate';

// import HomeIntro from "~/components/sections/HomeIntro.vue";
// import OffersSection from "~/components/sections/OffersSection.vue";
// import WelcomSection from "~/components/sections/WelcomSection.vue";

const HomeIntro = speedkitHydrate(() => import('@/components/sections/HomeIntro.vue'));
const OffersSection = speedkitHydrate(() => import('@/components/sections/OffersSection.vue'));
const WelcomSection = speedkitHydrate(() => import('@/components/sections/WelcomSection.vue'));

const {actResetParams} = useMainStore()
const runtimeConfig = useRuntimeConfig()
definePageMeta({
    layout: 'home'
})

useSeoMeta({
    title: 'Hima Travel Bileta Avioni',
    ogTitle: 'Hima Travel Bileta Avioni',
    description: 'Agjensi Turistike Hima Travel. E Njohur si Agjensi Udhetimesh qe nga 2011 ofron Udhetime me Guide dhe Individuale',
    ogDescription: 'Agjensi Turistike Hima Travel. E Njohur si Agjensi Udhetimesh qe nga 2011 ofron Udhetime me Guide dhe Individuale',
    ogType: 'website',
    ogLocale: 'en_US',
    ogSiteName: 'Bileta Avioni Hima Travel',
    ogImage: () => `${runtimeConfig.public.prodUrl}/images/red-logo.png`,
    ogImageWidth: '140',
    ogImageHeight: '56',
    ogImageType: 'image/png'
})

actResetParams();
</script>
<template>
    <div>
        <HomeIntro critical/>
        <OffersSection class="mt-32"/>
        <WelcomSection class="mt-80"/>
    </div>
</template>

<style scoped>

</style>
