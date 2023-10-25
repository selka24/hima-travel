<template>
    <div class="flex flex-col">
        <div class="text-lg font-bold">Tell us why the results are no good.</div>
        <div class="mb-4">It will help us be better next time!</div>
        <button-default v-for="(opt, idx) in tellUsOptions"
                        @click="handleSelect(idx)"
                        :key="idx"
                        :class="[{'bg-white !text-black': selected !== idx}, 'px-2 border mb-2.5 border-primary text-base font-normal py-4']">
            {{opt}}
        </button-default>
        <transition name="fade">
            <div v-if="selected === 2" class="flex flex-col gap-2.5">
                <div class="font-bold">Do you have something to say?</div>
                <textarea v-model="opinion" name="Tell-us" placeholder="Type something" rows="6" class="resize-none p-2 border rounded-md"></textarea>
                <button-default class="py-4 text-base font-normal">Send my feedback</button-default>
            </div>
        </transition>
    </div>
</template>
<script setup>
    const tellUsOptions = [
        'I found less expensive tickets somewhere else',
        'I believe flights are missing',
        'Other'
    ]
    const selected = ref(null);
    const opinion = ref('')

    const handleSelect = (opt) => {
        if(selected.value === opt)
            selected.value = null;
        else
            selected.value = opt;
    }
</script>
<style scoped>

</style>
