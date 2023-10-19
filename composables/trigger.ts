const trigger = ref(false);

export const useTrigger = () => {
    const toggleTrigger = () => {
        trigger.value = !trigger.value;
    }

    return {
        trigger,
        toggleTrigger
    }
}
