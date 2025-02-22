// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["assets/css/main.css", "animate.css"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "/api",
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: ["@nuxt/content"],
});