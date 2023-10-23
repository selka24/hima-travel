<script setup lang="ts">
import HomeIntro from "~/components/sections/HomeIntro.vue";
import OffersSection from "~/components/sections/OffersSection.vue";
import WelcomSection from "~/components/sections/WelcomSection.vue";

const {actResetParams} = useMainStore()

useHead({
    title: 'Hima Travel Bileta Avioni',
    meta: [
        { name: 'description', content: 'Agjensi Turistike Hima Travel. E Njohur si Agjensi Udhetimesh qe nga 2011 ofron Udhetime me Guide dhe Individuale' }
    ],
})

onMounted(() => {
    actResetParams();
})

</script>

<template>
    <div>
        <HomeIntro/>
        <OffersSection class="mt-32"/>
        <WelcomSection class="mt-80"/>
    </div>
</template>

<style scoped>

</style>
