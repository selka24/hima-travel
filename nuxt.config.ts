// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://rsms.me/inter/inter.css'
        }
      ]
    },
    rootId: 'selka24'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-icons',
    '@pinia/nuxt',
    'nuxt-api-party',
  ],
  apiParty: {
    endpoints: {
      myApi: {
        url: process.env.API_BASE_URL!,
        // Global headers sent with each request
        // headers: {
        //   Authorization: `Bearer ${process.env.API_BASE_URL!}`
        // }
      }
    }
  },
  css:[
      '~/assets/css/transitions.css'
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  image: {
    quality: 60,
  }
})
