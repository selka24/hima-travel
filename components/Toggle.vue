<template>
    <label for="toggle-box" class="cursor-pointer select-none">
        <input class="hidden" id="toggle-box" type="checkbox" :value="modelValue" @input="handleToggleChange">
        <span class="block rounded-[10px] bg-white overflow-hidden relative w-full">
            <span class="flex justify-between text-base relative z-10 font-bold">
                <span v-for="(opt, idx) in options"
                      :class="['transition-opacity duration-300 py-4 px-5 bg-secondary', (modelValue === !idx) ? 'bg-opacity-0 text-secondary' : 'text-white bg-opacity-1']" :key="opt">
                    {{opt}}
                </span>
            </span>
<!--            <span-->
<!--                :class="`-->
<!--                    rounded-[10px]-->
<!--                    w-1/2 bg-secondary h-[100%] absolute-->
<!--                    left-0-->
<!--                    top-0-->
<!--                    transition-all-->
<!--                    duration-500-->
<!--                    ease-out-->
<!--                    ${modelValue ? 'translate-x-full' : ''}-->
<!--                `"-->
<!--            />-->
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
