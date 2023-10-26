<script setup lang="ts">
    const props = defineProps(['options', 'currentSlide']);
    const emit = defineEmits(['slideChange'])
    const slide = ref(0)
    const goingBack = ref(false);

    const lastSlide = (props.options.length - 1);
    const handleSlideChange = (slideNo: number) => {
        let slideTo;
        console.log({slideNo, 'slide.value': slide.value})
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
    <div class="w-full h-full overflow-hidden relative">
        <div class="absolute w-full px-4 z-10 flex top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-between">
            <div @click="handleSlideChange(currSlideNo - 1)"
                 class="cursor-pointer flex items-center justify-center bg-white/80 rounded-full p-2">
                <nuxt-icon name="chevron-down-solid" class="text-2xl [&>*:first-child]:rotate-90" filled/>
            </div>
            <div @click="handleSlideChange(currSlideNo + 1)"
                 class="cursor-pointer flex items-center justify-center bg-white/80 rounded-full p-2">
                <nuxt-icon name="chevron-down-solid" class="text-2xl [&>*:first-child]:-rotate-90 text-primary" filled/>
            </div>
        </div>
        <div class="relative w-full h-full">
            <transition-group tag="div" :name="goingBack ? 'slideback' : 'slide'">
                <div v-for="(opt, idx) in options"
                     v-show="idx === currSlideNo"
                     class="w-full h-full absolute"
                     :key="idx">
                    <slot name="option" :option="opt" class="w-full h-full bg-primary"></slot>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<style scoped>

</style>
