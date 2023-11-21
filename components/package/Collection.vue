<script setup lang="ts">
import ButtonDefault from "~/components/ButtonDefault.vue";
import Carousel from "~/components/Carousel.vue";

const props = defineProps<{package: FullPackage}>();
const emit = defineEmits(['closed'])
const mainStore = useMainStore();
const {sendWhatsappMessage} = useUtils();
const images = computed(() => {
    return mainStore.getPackageImages(props.package).filter((img, index) => index < 6);
})
const currSlide = ref(0)
const showCarousel = ref(false)
const sixImages = computed(() => {
    return images.value.filter((img, index) => index < 6);
})

const setSlide = (idx: number) => {
    currSlide.value = idx;

}
const openSlide = (idx: number) => {
    setSlide(idx)
    showCarousel.value = true;
}

const handleClose = () => {
    if(showCarousel.value){
        showCarousel.value = false
    } else {
        emit('closed')
    }
}

onBeforeUnmount(() => {
    document.body.classList.remove('stopScroll')
})
</script>

<template>
    <div class="flex h-full w-full bg-secondary justify-center">

    <div class="flex flex-col relative h-full px-3 gap-3 max-w-page w-full">
        <div class="font-semibold sm:font-bold flex items-center justify-between text-white base-text sm:text-3xl pt-3">
            <div>
                {{package.hotel_data.hotel.name}}
            </div>
            <div @click="handleClose"
                 class="cursor-pointer flex items-center justify-center bg-white/80 rounded-full p-2">
                <nuxt-icon name="close" class="text-xs sm:base-text" filled/>
            </div>
        </div>
        <div class="flex-grow relative overflow-hidden">
            <transition-group name="page">
                <div v-if="!showCarousel" class="absolute grid grid-cols-2 grid-rows-3 w-full h-full gap-3">
                    <div v-for="(img, idx) in sixImages" :key="img">
                        <nuxt-img class="w-full h-full object-cover" :src="img" alt="img" @click="openSlide(Number(idx))"/>
                    </div>
                </div>
                <div v-else class="absolute w-full h-full">
                    <Carousel :slide-classes="['w-full h-full']" :options="images" :current-slide="currSlide" @slide-change="setSlide" :no-controls="true">
                        <template #option="{option}">
                            <nuxt-img loading="lazy" format="webp" class="bg-secondary w-full h-full object-contain" :src="option" :alt="option"/>
                        </template>
                        <template #empty>
                            Nuk ka imazhe per këtë hotel
                        </template>
                    </Carousel>
                </div>
            </transition-group>
        </div>
        <div class="pb-3">
            <button-default @click="sendWhatsappMessage(props.package)" class="w-full h-[70px]">
                Kontakto Tani
            </button-default>
        </div>
    </div>
    </div>
</template>

<style scoped>
    .heightGrid{
        max-height: calc(100dvh - 200px)
    }
</style>
