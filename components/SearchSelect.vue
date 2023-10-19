<script setup lang="ts">
const emit = defineEmits(['update:modelValue', 'focus', 'focusout', 'select']);
const listState = ref<Boolean>(false)
type Option = any
interface Props {
    modelValue: string
    placeholder?: string
    name?: string
    id?: string
    position?: string
    displayKey?: string
    filter?: boolean
    options: Option[]
}
const props = defineProps<Props>()

const hideList = () => {
    listState.value = false
}
const showList = () => {
    listState.value = true
}

const filteredOptions = computed(() => {
    if(props.filter) {
        const search = props.modelValue.toLowerCase();
        return props.options.filter(opt => {
            return opt[props.displayKey || ''].toLowerCase().indexOf(search) >= 0;
        })
    }
    return props.options;
})

const handleInputFocus = (focus: boolean) => {
    if(focus){
        showList();
        emit('focus')
    } else {
        emit('focusout')
    }
}

const handleSelect = (option: Origin) => {
    emit('select', option);
    hideList();
}
</script>

<template>
    <div class="relative w-full" v-click-outside="hideList">
        <input type="text" :id="id"
               autocomplete="off"
               :class="[`base-input rounded-t-[10px]`, {'rounded-b-[0px]': listState}]"
               :value="modelValue"
               @focus="handleInputFocus(true)"
               @focusout="handleInputFocus(false)"
               :placeholder="placeholder"
               @input="(e) => emit('update:modelValue', e.currentTarget.value)">
        <div v-show="listState" :class="`absolute ${position || 'bottom'}-0 w-full pb-2.5 bg-white shadow-[0_0_5px_0] shadow-gray-normal rounded-b-[10px]`">
            <div v-for="(option, idx) in filteredOptions" @click="handleSelect(option)" class="hover:bg-secondary/20 cursor-pointer">
                <div class="px-5 py-2.5">
                    <slot class="cursor-pointer" name="option" v-bind="option">
                        {{option[displayKey]}}
                    </slot>
                </div>
                <hr v-if="filteredOptions.length > idx + 1" class="my-2">
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
