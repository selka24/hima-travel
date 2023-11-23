<script setup lang="ts">
    const {formatDateSQ} = useUtils()
    const props = defineProps<{lastUpdate: string}>()

    const formatTime = computed(() => {
        return formatDateSQ(props.lastUpdate, 'dd-LLL-yyyy')
    })
</script>

<template>
    <div class="flex gap-1 items-center text-gray-hard text-xs">
<!--        <nuxt-icon name="clock-regular"/>-->
        <div>
            Oferta e përditësuar më: {{formatTime}}
        </div>
    </div>
</template>

<style scoped>

</style>
