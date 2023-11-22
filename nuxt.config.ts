// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'sq_AL'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
    rootId: 'selka24',
    layoutTransition: { name: 'page', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-icons',
    '@pinia/nuxt',
    'nuxt-simple-sitemap',
    '@vueuse/nuxt',    // 'nuxt-api-party',
  ],
  components:{
    dirs: []
  },
  // apiParty: {
  //   endpoints: {
  //     myApi: {
  //       url: process.env.API_BASE_URL!,
  //       // Global headers sent with each request
  //       // headers: {
  //       //   Authorization: `Bearer ${process.env.API_BASE_URL!}`
  //       // }
  //     }
  //   }
  // },
  css:[
      '~/assets/css/transitions.css',
      '~/assets/css/main.css',
      '~/assets/css/fonts.css'
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      storageUrl: process.env.STORAGE_URL,
      prodUrl: process.env.PROD_URL
    }
  },
  image: {
    domains: ['http://biletaautobusi.com'],
    quality: 70
  }
})
