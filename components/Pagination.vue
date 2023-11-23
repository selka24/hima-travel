<script setup lang="ts">
    const props = defineProps(['currPage', 'count', 'perPage']);
    const emit = defineEmits(['pageChanged'])
    const pagesNo = computed(() => Math.ceil(props.count/props.perPage));
    const next = () => {
        emit('pageChanged', props.currPage + 1);
    }
    const back = () => {
        emit('pageChanged', props.currPage - 1);
    }
</script>

<template>
    <div class="flex select-none items-center justify-between w-full max-w-[400px] px-5">
        <nuxt-icon @click="back" :class="`text-4xl ${currPage > 1 ? 'text-primary cursor-pointer' : 'text-gray-normal'}`" name="arrow"/>
        <div class="text-primary text-2xl">Faqe {{currPage}} nga {{ pagesNo }}</div>
        <nuxt-icon @click="next" name="arrow" :class="`text-4xl [&>*:first-child]:rotate-180 ${currPage < pagesNo ? 'text-primary cursor-pointer' : 'text-gray-normal'}`"/>
    </div>
</template>

<style scoped>

</style>
