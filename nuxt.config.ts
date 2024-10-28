// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [
    '~/assets/styles/main.scss',
    'vue-final-modal/style.css',
  ],

  modules: [
    '@vee-validate/nuxt',
    'nuxt-float-label',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      Montserrat: [300, 400, 500, 600, 700, 800],
    },
    display: 'swap',
  },
})
