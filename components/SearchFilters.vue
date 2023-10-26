<script setup lang="ts">
    const sortOptions = [
        {title: 'Rekomandimit', value: 1},
        {title: 'Çmimi më i ulët', value: 2},
        {title: 'Çmimi më i lartë', value: 3},
    ]
    const currSort = ref(sortOptions[0]);

    const handleSortChange = (sort) => {
        currSort.value = sort;
    }

    const priceTotal = ref(false)
</script>

<template>
<div class="flex gap-y-10 flex-wrap justify-between items-center w-full">
    <div class="flex items-center justify-between w-[300px]">
        <div class="min-w-max">Rendit sipas:</div>
        <Dropdown class="w-full" :options="sortOptions" @option-changed="handleSortChange" :selected="currSort">
            <template #default="{option}">
                {{option.title}}
            </template>
        </Dropdown>
    </div>
    <div class="flex items-center">
        <div class="mr-2">Çmimet:</div>
        <Toggle v-model="priceTotal" :options="['Për person', 'Totali']"/>
    </div>
</div>
</template>

<style scoped>

</style>
