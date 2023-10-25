const triggerModal = ref(false);

export const useTriggerModal = () => {
    const toggleTrigger = () => {
        triggerModal.value = !triggerModal.value;
    }

    return {
        triggerModal: triggerModal,
        toggleTrigger
    }
}
