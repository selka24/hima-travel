<template>
    <div class="smallPics flex gap-5 overflow-hidden overflow-x-scroll min-h-[150px]">
        <div v-for="(img, idx) in images"
             :key="img"
             @click="handleImageSelect(idx)"
             :class="[{'border-2 border-primary' : idx === currImage},'min-w-[120px] h-[120px] cursor-pointer rounded-[20px] overflow-hidden']">
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
/*
.smallPics::-webkit-scrollbar {
    display: none;
}

.smallPics {
    -ms-overflow-style: none;
    scrollbar-width: none;   Firefox
}
*/
</style>
