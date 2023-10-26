<template>
    <div class="flex gap-5 overflow-hidden overflow-x-scroll">
        <div v-for="(img, idx) in images"
             :key="img"
             @click="handleImageSelect(idx)"
             :class="[{'border-2 border-primary' : idx === currImage},'cursor-pointer rounded-[20px] min-w-[120px] min-h-[120px] overflow-hidden']">
            <nuxt-img format="webp" :src="`/package-sample/${img}`" width="120" height="120"/>
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
