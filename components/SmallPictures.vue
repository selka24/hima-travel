<template>
    <div class="smallPics flex gap-5 overflow-hidden overflow-x-scroll min-w-[120px] min-h-[120px]">
        <div v-for="(img, idx) in images"
             :key="img"
             @click="handleImageSelect(idx)"
             :class="[{'border-2 border-primary' : idx === currImage},'cursor-pointer rounded-[20px] overflow-hidden']">
            <nuxt-img class="w-full h-full" format="webp" :src="img" width="120" height="120"/>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps(['currImage', 'images'])
const emit = defineEmits(['imageChange'])
const handleImageSelect = (imgNo: number | string) => {
    emit('imageChange', imgNo)
}

</script>
<style scoped>
.smallPics::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.smallPics {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>
