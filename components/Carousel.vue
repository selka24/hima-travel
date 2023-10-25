<script setup lang="ts">
    const props = defineProps(['options', 'currentSlide']);
    const slide = ref(0)
    const goingBack = ref(false);
    const handleSlideChange = (slideNo: number) => {
        goingBack.value = (slideNo < slide.value);
        if(slideNo + 1 > props.options.length){
            slide.value = 0;
        } else if(slideNo < 0) {
            slide.value = props.options.length - 1
        } else {
            slide.value = slideNo;
        }
    }

    const currentOptions = computed(() => {
        return [props.options[slide.value]];
    })

    watch(() => props.currentSlide, (val) => {
        handleSlideChange(val)
    })
</script>

<template>
    <div class="w-full h-full overflow-hidden relative">
        <div class="absolute w-full px-4 z-10 flex top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-between">
            <div @click="handleSlideChange(slide - 1)"
                 class="cursor-pointer flex items-center justify-center bg-white/80 rounded-full p-2">
                <nuxt-icon name="chevron-down-solid" class="text-2xl [&>*:first-child]:rotate-90" filled/>
            </div>
            <div @click="handleSlideChange(slide + 1)"
                 class="cursor-pointer flex items-center justify-center bg-white/80 rounded-full p-2">
                <nuxt-icon name="chevron-down-solid" class="text-2xl [&>*:first-child]:-rotate-90 text-primary" filled/>
            </div>
        </div>
        <div class="relative w-full h-full">
            <transition-group tag="div" :name="goingBack ? 'slideback' : 'slide'">
                <div v-for="(opt, idx) in options"
                     v-show="idx === slide"
                     class="w-full h-full absolute"
                     :key="idx">
                    <slot name="option" :option="opt" class="w-full h-full bg-primary"></slot>
                </div>
            </transition-group>
        </div>
<!--        <slot name="option" v-bind:options="currentOptions">{{currentOptions}}</slot>-->

    </div>
</template>

<style scoped>

</style>
