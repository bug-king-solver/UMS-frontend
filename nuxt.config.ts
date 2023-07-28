// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],
  css: ['~/assets/scss/main.scss'],
  app: {
    head: {
      script: ['/oneui/js/oneui.app.min.js']
    }
  },
  vite: {
    worker: {
      format: "es"
    }
  }
})
