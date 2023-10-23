<template>
    <div>
        <LazyLayoutHeader v-if="route.path !== '/'"/>
        <NuxtPage/>
        <Footer/>
<!--        <composable-trigger-test/>-->
    </div>
</template>
<script setup lang="ts">
import Footer from "~/components/layout/Footer.vue";
// import ComposableTriggerTest from "~/components/layout/ComposableTriggerTest.vue";

const route = useRoute();
</script>
