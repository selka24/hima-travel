<script setup lang="ts">
import HotelStars from "~/components/HotelStars.vue";

defineProps<{hotel_data: FullHotel, stars: boolean}>()
</script>

<template>
    <div class="text-2xl flex flex-col gap-3 font-bold mb-10">
        <HotelStars :stars="hotel_data.hotel.stars" v-if="stars"/>
        <div>
            {{hotel_data.hotel?.name || '*No name*'}}
        </div>
    </div>
</template>

<style scoped>

</style>
