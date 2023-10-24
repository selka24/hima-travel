<script setup lang="ts">
    const props = defineProps(['message', 'theme', 'timeout', 'trigger'])

    const showTooltip = ref(false);

    const themeStyle = computed(() => {
        switch (props.theme) {
            case 'error':
                return 'bg-primary text-white';
            default:
                return 'bg-white text-secondary'
        }
    })

    watch(() => props.trigger, () => {
        console.log('triggereed')
        showTooltip.value = true;
        setTimeout(() => {
            showTooltip.value = false;
        }, props.timeout || 300)
    })
</script>

<template>
    <div :class="['opacity-0 -top-[45%] left-1/2 -translate-x-1/2 absolute z-[30] inline-block px-3 py-2 text-sm font-medium transition-opacity duration-300 rounded-lg shadow-sm', {'opacity-100': showTooltip}, themeStyle]">
        {{ message || 'Tooltip content' }}
        <div :class="`arrow absolute top-0 left-1/2 -translate-x-1/2  border-t-[15px] ${theme === 'error' ? 'border-t-primary' : 'border-t-white'}`"></div>
    </div>
</template>

<style scoped>
.arrow {
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    margin: 2rem 0;
}
</style>
