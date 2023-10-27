<template>
    <div class="pt-8 pb-12 px-9 bg-white rounded-[30px] border border-gray-normal">
        <div class="font-bold text-[22px] mb-10">Rezervo udhëtimin tënd tani</div>
        <div class="grid grid-cols-6">
            <div class="col-span-6 sm:col-span-3 md:col-span-4 flex flex-col lg:max-h-[170px] gap-y-5 flex-wrap">
                <div v-for="(info, idx) in sampleInfo" class="flex gap-3" :key="idx + 'bookinfo'">
                    <nuxt-icon :name="icons[idx]" class="text-2xl" filled />
                    <div>{{info}}</div>
                </div>
            </div>
            <div class="col-span-6 sm:col-span-3 md:col-span-2 flex justify-end">
                <div class="flex flex-col xs:flex-row items-center w-full sm:w-auto gap-x-5 pt-10 sm:pt-0 justify-between sm:flex-col sm:justify-center">
                    <div class="flex flex-col items-center">
                        <div class="text-lg font-bold">Për person</div>
                        <div class="font-bold text-[36px] min-w-max sm:text-[55px]">399 €</div>
                    </div>
                    <button-default class="h-[70px] w-[260px] font-normal" @click="sendWhatsappMessage">Vazhdo</button-default>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const icons = ['user', 'moon', 'calendar', 'food', 'suitcase', 'backpack', 'bed']
const sampleInfo = [
    '2 Adults',
    '7 Netë',
    'Friday 20 Shtator 2023',
    'Mëngjesi i përfshirë',
    'Valixhe deri në 22 kg',
    'Çanë shpine deri në 22 kg',
    '1 x Dhomë dyshe',
]

const sendWhatsappMessage = () => {
    const number = '355696696144';
    const info = ['Udhetime', 'Mar, 20 Shtator 2023', '2','http://localhost:3000/package']
    const link = `https://api.whatsapp.com/send/?phone=${number}&text=`
    let message = `Pershendetje%0a
        Dua %20te%20 prenotoj %20paketen:%20${info[0]}%0a
        Data:%20 ${info[1]}%0a
        Numri%20 personave:%20${info[2]}%0a
        Linku%20 pakets:%20${info[3]}`
    window.open(link + message.replace(/\s+/g, ''), "_blank");
}

</script>

<style scoped>

</style>
