<script setup lang="ts">
    // interface Link {
    //     url: string | null,
    //     label: string,
    //     active: boolean
    // }

    interface IPagination {
        current_page: number
        per_page: number
        total: number
        next_page_url: number | null
        prev_page_url: number | null
    }

    const props = defineProps<{pagination: IPagination}>()

    const next = () => {

    }

    const back = () => {

    }
</script>

<template>
    <div class="flex select-none items-center justify-between w-full max-w-[400px] px-5">
        <nuxt-icon @click="back" :class="`text-4xl ${pagination.prev_page_url ? 'text-primary cursor-pointer' : 'text-gray-normal'}`" name="arrow"/>
        <div class="text-primary text-2xl">{{pagination.current_page}}</div>
        <nuxt-icon @click="next" name="arrow" :class="`text-4xl [&>*:first-child]:rotate-180 ${pagination.next_page_url ? 'text-primary cursor-pointer' : 'text-gray-normal'}`"/>
    </div>
</template>

<style scoped>

</style>
