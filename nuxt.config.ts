// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'slide', mode: 'out-in' },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    POC_COOKBOOK_API: process.env.POC_COOKBOOK_API,
  },
})
