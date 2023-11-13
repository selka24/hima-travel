<template>
    <div class="flex items-center">
        <div class="text-3xl">Ofertat më poshtë janë me nisje nga</div>
        <div class="text-primary text-4xl ml-3 font-bold">{{ origin || 'Tirana' }}</div>
    </div>
</template>
<script setup>
const route = useRoute();

const origin = computed(() => {
    return route.query && route.query.origin;
})
</script>
