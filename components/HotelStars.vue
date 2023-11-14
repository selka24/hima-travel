<template>
    <div class="flex gap-1">
        <nuxt-icon name="star-solid" class="text-inherit !text-yellow-500" v-for="star in stars" :key="star + 'star'"/>
    </div>
</template>
<script setup lang="ts">
defineProps<{stars: number}>();
</script>
