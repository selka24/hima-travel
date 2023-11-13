<script setup lang="ts">

import Carousel from "~/components/Carousel.vue";
</script>

<template>
    <div class="flex justify-center items-center w-full">
        <Carousel :options="['paris.png', 'bed.png', 'sunbed.png', 'beach.png']">
            <template #option="{option}">
                <nuxt-img width="600" height="500" loading="lazy" format="webp" class="bg-gray-light w-full h-full object-cover" :src="`/package-sample/${option}`" :alt="option"/>
            </template>
        </Carousel>
    </div>
</template>

<style scoped>

</style>
