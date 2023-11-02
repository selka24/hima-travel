<template>
    <div class="relative" v-click-outside="() => {show = false}">
        <div class="flex gap-2 cursor-pointer select-none min-w-max justify-center items-center" @click="() => {show = !show}">
            <div class="font-bold">{{ selected?.title }}</div>
            <nuxt-icon name="chevron-down-solid" :class="[(show ? 'chevron-up' : 'chevron-down'), 'text-2xl']" filled/>
        </div>
        <transition name="slide-fade">
            <div v-if="show" class="z-[30] absolute bg-white top-10 w-full shadow-[0_0_5px_0] shadow-gray-normal rounded-[10px] flex flex-col text-center overflow-auto max-h-[250px] [&>*:first-child]:pt-5 [&>*:last-child]:pb-5">
                <div v-for="opt in options" @click="handleOptionSelect(opt)" class="cursor-pointer text-gray-hard py-3 hover:bg-primary hover:text-white w-full">
                    <slot :option="opt">{{opt}}</slot>
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
defineProps(['options', 'selected']);
const emit = defineEmits(['optionChanged']);
const show = ref(false);

const handleOptionSelect = (opt: any) => {
    emit('optionChanged', opt);
    show.value = false;
}

</script>
<style scoped>
.chevron-up {
    transform: rotateX(0.5turn);
    transition: all .2s;
}
.chevron-down{
    transform: rotateX(0);
    transition: all .3s;
}
</style>
