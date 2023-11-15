<script setup lang="ts">
    import {contactInfo, pages, socialNetworks} from "~/constants";
</script>

<template>
    <div class="flex justify-center mt-72 px-5 pb-14 pt-20 lg:px-10 bg-white">
        <DevOnly>
            <div class="fixed rounded-full bg-green-600 p-3 text-white top-3 z-[9999]">DEV MODE</div>
        </DevOnly>
        <div class="max-w-page grid grid-cols-6 w-full">
<!--                <nuxt-img format="webp"  src="/images/red-logo.png" alt="red-logo"  width="140" height="56" class="max-w-[150px] w-full"/>-->
                <div class="col-span-3 base-text hidden md:block">
                    HimaTrips,
                    <div class="mt-1.5"></div>
                    Krijuar për të ju ofruar një Kërkim te pandërprerë të
                    <br>
                    shërbimeve të udhëtimit për Bileta + Hotel.
                    <div class="mt-1.5"></div>
                    Lidhur me mbi 200+ furnitorë Global për të pasur
                    <br>
                    opsionet dhe cmimet më të mira.
                    <div class="mt-1.5"></div>
                    Kur bëhet fjalë për fluturimet, ne shërbejmë si
                    <br>
                    ndërmjetësuesi juaj në menaxhimin e procesit të
                    <br>
                    rezervimit me linjën ajrore; është e rëndësishme të
                    <br>
                    theksohet se ne nuk veprojmë si përfaqësues i linjës ajrore.
                    <div class="mt-1.5"></div>
                    Ju lutemi, Të keni parasysh se çdo produkt i zgjedhur
                    <br>
                    krijon një marrëdhënie të veçantë kontraktuale midis
                    <br>
                    jush dhe furnizuesit specifik të lidhur me atë produkt.
                </div>
            <div class="col-span-3">

            <div class="flex flex-wrap gap-10">
                <div class="flex flex-col gap-7">
                    <div class="text-primary font-bold text-xl">Kontakt</div>
                    <div v-for="info in contactInfo" v-html="info"/>
                </div>
<!--                <div class="flex flex-col gap-7">-->
<!--                    <div class="text-primary font-bold text-xl">Menu</div>-->
<!--                    <div v-for="menu in pages">-->
<!--                        {{menu.title}}-->
<!--                    </div>-->
<!--                </div>-->
                <div class="flex flex-col gap-7">
                    <div class="text-primary font-bold text-xl">Na ndiqni</div>
                    <a v-for="net in socialNetworks" :href="net.link"  target="_blank" class="flex min-w-max gap-1.5">
                        <nuxt-icon :name="net.title" filled class="text-2xl"/>
                        <div>{{net.title}}</div>
                    </a>
                </div>
            </div>
            </div>

        </div>
    </div>
</template>

<style scoped>

</style>
