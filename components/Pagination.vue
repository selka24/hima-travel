<script setup lang="ts">
    const props = defineProps(['currPage', 'count', 'perPage']);
    const emit = defineEmits(['pageChanged'])
    const page = ref(1);
    const pagesNo = computed(() => Math.floor(props.count/props.perPage));
    const next = () => {
        if(page.value < pagesNo.value) {
            page.value++;
        }
    }

    const back = () => {
        if(page.value > 1)
            page.value--;
    }

    watch(() => page, () => {
        emit('pageChanged', page.value);
    })

    watch(() => props.currPage, () => {
        page.value = props.currPage;
    })
</script>

<template>
    <div class="flex select-none items-center justify-between w-full max-w-[400px] px-5">
        <nuxt-icon @click="back" :class="`text-4xl ${page > 1 ? 'text-primary cursor-pointer' : 'text-gray-normal'}`" name="arrow"/>
        <div class="text-primary text-2xl">{{page}}</div>
        <nuxt-icon @click="next" name="arrow" :class="`text-4xl [&>*:first-child]:rotate-180 ${page < pagesNo ? 'text-primary cursor-pointer' : 'text-gray-normal'}`"/>
    </div>
</template>

<style scoped>

</style>
