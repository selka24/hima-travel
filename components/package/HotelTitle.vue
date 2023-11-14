<script setup lang="ts">
import HotelStars from "~/components/HotelStars.vue";

defineProps<{hotel_data: FullHotel}>()
</script>

<template>
    <div class="text-2xl flex justify-between font-bold mb-10">
        <div>
            HOTEL {{hotel_data.hotel?.name || '*No name*'}}
        </div>
        <HotelStars :stars="hotel_data.hotel.stars"/>
    </div>
</template>

<style scoped>

</style>
