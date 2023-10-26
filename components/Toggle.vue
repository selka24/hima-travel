<template>
    <label for="toggle-box" class="cursor-pointer select-none">
        <input class="hidden" id="toggle-box" type="checkbox" :value="modelValue" @input="handleToggleChange">
        <span class="block rounded-[10px] bg-white overflow-hidden relative w-full">
            <span class="grid grid-cols-2 text-base relative z-10 font-bold">
                <span v-for="(opt, idx) in options"
                      :class="['transition-all min-w-max text-center duration-[200ms] ease-in py-4 px-5 bg-secondary', (modelValue === !idx) ? 'bg-opacity-0 text-secondary' : 'text-white bg-opacity-1']" :key="opt">
                    {{opt}}
                </span>
            </span>
        </span>
    </label>
</template>
<script setup>
defineProps({
    modelValue: Boolean,
    options: {
        type: Array,
        default: ['false', 'true']
    }
})

const emit = defineEmits(['update:modelValue']);
const handleToggleChange = (e) => {
    emit('update:modelValue', !JSON.parse(e.currentTarget.value))
}
</script>
