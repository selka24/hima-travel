<template>
    <div class="relative w-full" v-click-outside="hideList">
        <input type="text" :id="id"
               autocomplete="off"
               :class="[`base-input rounded-t-[10px]`, {'rounded-b-[0px]': listState}]"
               :value="modelValue"
               @focus="handleInputFocus"
               :placeholder="placeholder"
               @input="(e) => emit('update:modelValue', e.currentTarget.value)">
        <transition name="slide-fade">
            <div v-show="listState" :class="`absolute w-full z-10 pb-2.5 bg-white shadow-[0_0_5px_0] shadow-gray-normal rounded-b-[10px]`">
                <div v-for="(option, idx) in filteredOptions" @click="handleSelect(option)" class="hover:bg-secondary/20 cursor-pointer">
                    <div class="px-5 py-2.5">
                        <slot class="cursor-pointer" name="option" v-bind="option">
                            {{option[displayKey]}}
                        </slot>
                    </div>
                    <hr v-if="filteredOptions.length > idx + 1" class="my-2">
                </div>
            </div>
        </transition>
        <div :class="`text-primary ${showError ? '' : 'invisible'} min-w-max mt-2`">
            {{error || 'Here will be displayed an error'}}
        </div>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'focus', 'focusout', 'select']);
const props = defineProps<{
    modelValue: string
    placeholder?: string
    name?: string
    id?: string
    position?: string
    displayKey?: string
    filterKey?: string | string[]
    options: any
    selected: any
    error?: string
}>();

const {multipleSearchFilter} = useUtils();
const listState = ref<Boolean>(false);
const showError = ref<Boolean>(false);
const hideList = () => {
    listState.value = false;
    emit('focusout');
}
const showList = () => {
    listState.value = true
}

const filteredOptions = computed(() => {
    if(props.modelValue && props.filterKey) {
        const search = props.modelValue.toLowerCase();
        return multipleSearchFilter(props.options, props.filterKey, search);
    }
    return props.options;
})
const handleInputFocus = () => {
    if(props.error) {
        showError.value = true;
    } else {
        showList();
        emit('focus');
    }
}
const handleSelect = (option: Origin) => {
    emit('select', option);
    hideList();
}

watch(() => props.error, (value) => {
    if(!value) showError.value = false;
})
</script>

<style scoped>

</style>
