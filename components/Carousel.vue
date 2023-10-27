<script setup lang="ts">
    const props = defineProps(['options', 'currentSlide', 'slideClasses']);
    const emit = defineEmits(['slideChange'])
    const slide = ref(0)
    const goingBack = ref(false);

    const lastSlide = (props.options.length - 1);
    const handleSlideChange = (slideNo: number) => {
        let slideTo;
        if(slideNo > lastSlide){
            slideTo = 0;
        } else if(slideNo < 0) {
            slideTo = lastSlide
        } else {
            slideTo = slideNo;
        }
        if (hasParentSlide.value)
            emit('slideChange', slideTo);
        else
            slide.value = slideTo;
    }

    const handleGoingBack = (newValue: number, oldValue: number) => {
        if(newValue === 0 && oldValue === lastSlide){
            goingBack.value = false;
        } else if(oldValue === 0 && newValue === lastSlide) {
            goingBack.value = true;
        } else {
            goingBack.value = (newValue < oldValue);
        }
    }

    const hasParentSlide = computed(() => {
        return props.currentSlide !== undefined;
    })

    const currSlideNo = computed(() => {
        return hasParentSlide.value ? props.currentSlide : slide.value;
    }, {
        onTrigger({newValue, oldValue}) {
            handleGoingBack(newValue, oldValue);
        }
    })
</script>

<template>
    <div :class="['overflow-hidden relative', ...(slideClasses || ['w-[500px]', 'h-[500px]']), {'border-2 rounded-[20px]': !options.length}]">
        <div v-if="options.length" class="w-full absolute px-4 z-10 flex top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-between">
            <div @click="handleSlideChange(currSlideNo - 1)"
                 class="cursor-pointer flex items-center justify-center bg-white/80 rounded-full p-2">
                <nuxt-icon name="chevron-down-solid" class="text-2xl [&>*:first-child]:rotate-90" filled/>
            </div>
            <div @click="handleSlideChange(currSlideNo + 1)"
                 class="cursor-pointer flex items-center justify-center bg-white/80 rounded-full p-2">
                <nuxt-icon name="chevron-down-solid" class="text-2xl [&>*:first-child]:-rotate-90 text-primary" filled/>
            </div>
        </div>
        <transition-group :name="goingBack ? 'slideback' : 'slide'">
            <div v-for="(opt, idx) in options"
                 v-show="idx === currSlideNo"
                 :class="['absolute w-full h-full']"
                 :key="idx">
                <slot name="option" :option="opt" class="w-full h-full bg-primary"></slot>
            </div>
        </transition-group>
        <div class="flex justify-center items-center h-full" v-if="!options.length">
            <slot name="empty">No options available</slot>
        </div>
    </div>
</template>

<style scoped>

</style>
