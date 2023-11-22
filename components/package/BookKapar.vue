<script setup lang="ts">
defineProps<{kapar: string}>()
</script>

<template>
    <div class="select-none border border-[#55C7F8] bg-[#55C7F8]/10 flex items-center gap-2 justify-center p-1 text-gray-700 cursor-pointer rounded-md text-sm sm:base-text">
        <nuxt-icon name="info"/>
        <div>
            Rezervo me {{ kapar ? Math.ceil(Number(kapar)) : 0 }} € Kapar sot
        </div>
    </div>
</template>

<style scoped>

</style>
