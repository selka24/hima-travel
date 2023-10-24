<script setup lang="ts">
defineProps(['tabs', 'activeTab'])
const emit = defineEmits(['tabChange'])
const handleTabChange = (idx: number) => {
    emit('tabChange', idx);
}

</script>

<template>
    <div class="flex flex-col">
        <div class="flex">
            <div v-for="(tab, idx) in tabs" :key="idx + 'tab'"
                 :class="['relative text-lg font-bold', ( activeTab === idx ? 'text-primary': 'text-gray-hard'), (idx === 0 ? 'flex-1' : 'flex-1')]">
                <div class="text-center cursor-pointer" @click="handleTabChange(idx)">{{tab}}</div>
                <div class="relative">
                    <div class="line">
                        <transition name="fade">
                            <div v-if="activeTab === idx" class="triangle"></div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.line {
    height: 10px;
    border-bottom: 2px solid #ED1B23;
}

.triangle {
    background: white;
    border: 2px solid #ED1B23;
    border-width: 0px 0px 2px 2px;
    transform: translateX(-50%) rotate(-45deg);
    position: relative;
    left: 50%;
    top: 0;
    width: 20px;
    height: 20px;
}
</style>
