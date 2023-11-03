<template>
        <div class="flex">
            <div v-for="(tab, idx) in tabs" :key="idx + 'tab'"
                 :class="['relative w-full text-lg font-bold', ( activeTab === idx ? 'text-primary': 'text-gray-hard')]">
                <div class="flex justify-center cursor-pointer mb-2" @click="handleTabChange(idx)">
                    <slot :tab="tab">
                        {{tab}}
                    </slot>
                </div>
                <div class="relative">
                    <div class="line">
                        <transition :name="transitionName">
                            <div v-if="activeTab === idx" class="w-full absolute flex justify-center">
                                <div :class="['triangle', `${bgTriangle ? bgTriangle : 'bg-white'}`]"></div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
</template>
<script setup lang="ts">
const props = defineProps(['tabs', 'activeTab', 'bgTriangle'])
const emit = defineEmits(['tabChange'])
const transitionName = ref('slide-arrow')
const handleTabChange = (idx: number | string) => {
    emit('tabChange', Number(idx));
}

watch(() => props.activeTab, (newValue, oldValue) => {
    const lastOption = props.tabs.length - 1;
    if(newValue === 0 && oldValue === lastOption){
        transitionName.value = 'slideback-arrow';
    } else if(oldValue === 0 && newValue === lastOption) {
        transitionName.value = 'slide-arrow';
    } else {
        transitionName.value = (newValue < oldValue) ? 'slide-arrow' : 'slideback-arrow';
    }
})

</script>
<style scoped>

.slideback-arrow-leave-active,
.slideback-arrow-enter-active {
    transition: all 0.7s;
}
.slideback-arrow-enter-from {
    transform: translate(-100%, 0);
    opacity: 0;
}
.slideback-arrow-leave-to {
    transform: translate(100%, 0);
    opacity: 0;
}



.slide-arrow-leave-active,
.slide-arrow-enter-active {
    transition: all 0.7s;
}
.slide-arrow-enter-from {
    transform: translate(100%, 0);
    opacity: 0;
}
.slide-arrow-leave-to {
    transform: translate(-100%, 0);
    opacity: 0;
}

.line {
    height: 10px;
    border-bottom: 3px solid #ED1B23;
}

.triangle {
    position: relative;
    border-radius: 0 5px 0 5px;
    border: 3px solid #ED1B23;
    border-width: 0px 0px 3px 3px;
    transform: rotate(-45deg);
    width: 20px;
    height: 20px;
}
</style>
