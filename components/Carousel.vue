<script setup lang="ts">
    const props = defineProps(['options', 'currentSlide', 'slideClasses', 'noControls', 'mobile']);
    const emit = defineEmits(['slideChange'])
    const slide = ref(0)
    const carousel = ref(null)
    const goingBack = ref(false);

    const {direction} = useSwipe(carousel);

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

        handleGoingBack(slideTo, currSlideNo.value);

        if (hasParentSlide.value) {
            console.log({slideTo})
            emit('slideChange', slideTo);
        } else
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
    })

    const handleSwipe = (swipeDirection: string) => {
        if(swipeDirection === 'left'){
            console.log('swiping left');
            handleSlideChange(currSlideNo.value + 1)
        } else if (swipeDirection === 'right') {
            console.log('swiping right');
            handleSlideChange(currSlideNo.value - 1)
        }
    }

    watch(direction, (val) => {
        handleSwipe(val)
    })
</script>

<template>
    <div ref="carousel" :class="['overflow-hidden relative', ...(slideClasses || ['w-[500px]', 'h-[500px]']), {'border-2 rounded-[20px]': !options.length}]">
<!--        <div v-if="options.length && !noControls" class="w-full px-4 z-10 flex absolute-center items-center justify-between">-->
            <div v-if="options.length && !noControls" @click="handleSlideChange(currSlideNo - 1)"
                 class="cursor-pointer flex items-center justify-center max-w-min bg-white/80 rounded-full p-1 sm:p-2 absolute top-1/2 -translate-y-1/2 z-10 left-4">
                <nuxt-icon name="chevron-down-solid" class="base-text sm:text-2xl [&>*:first-child]:rotate-90" filled/>
            </div>
            <div v-if="options.length && !noControls" @click="handleSlideChange(currSlideNo + 1)"
                 class="cursor-pointer flex items-center justify-center max-w-min bg-white/80 rounded-full p-1 sm:p-2 absolute top-1/2 -translate-y-1/2 z-10 right-4">
                <nuxt-icon name="chevron-down-solid" class="base-text sm:text-2xl [&>*:first-child]:-rotate-90 text-primary" filled/>
            </div>
<!--        </div>-->
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
