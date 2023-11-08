<template>
    <div class="flex items-center relative">
        <nuxt-icon @click="scroll(0)" name="chevron-down-solid" class="absolute cursor-pointer z-10 -left-7 text-2xl [&>*:first-child]:rotate-90" filled/>
        <div ref="smallPics" class="relative smallPics items-center flex gap-5 overflow-hidden overflow-x-scroll min-h-[150px]">
            <div v-for="(img, idx) in images"
                 :key="img"
                 @click="handleImageSelect(idx)"
                 :class="[{'border-2 border-primary' : idx === currImage},'min-w-[120px] h-[120px] cursor-pointer rounded-[20px] overflow-hidden']">
                <nuxt-img class="w-full h-full" format="webp" :src="img" width="120" height="120"/>
            </div>
        </div>
        <nuxt-icon @click="scroll(smallPics?.scrollWidth)" name="chevron-down-solid" class="absolute cursor-pointer z-10 -right-7 text-2xl [&>*:first-child]:-rotate-90" filled/>
    </div>
</template>
<script setup lang="ts">
defineProps(['currImage', 'images'])
const emit = defineEmits(['imageChange']);
const smallPics = ref<HTMLElement | null>(null)
const handleImageSelect = (imgNo: number | string) => {
    emit('imageChange', imgNo)
}

const scroll = (scrollValue : number) => {
    smallPics.value?.scrollTo({
        left: scrollValue,
        top: 0,
        behavior: 'smooth'
    });
}

</script>
<style scoped>
.smallPics::-webkit-scrollbar {
    display: none;
}

.smallPics {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
