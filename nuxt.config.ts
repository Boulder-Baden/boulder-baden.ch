// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "BOUBA - Boulder Baden",
      htmlAttrs: {
        lang: "de",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon/b1.svg" }],
    },
    rootId: "app",
  },
  runtimeConfig: {
    public: {
      // Canonical domain for canonical links and Open Graph URLs.
      // Override with NUXT_PUBLIC_SITE_URL if needed.
      siteUrl: "https://boulder-baden.ch",
    },
  },
  compatibilityDate: "2025-07-15",
  css: [
    "~/assets/styles/all.css",
    "~/assets/styles/desktop.css",
    "~/assets/styles/mobile.css",
    "~/assets/styles/tablet.css",
  ],
  devtools: { enabled: true },
  vite: {
    server: {
      ws: {
        protocol: "wss",
      },
    },
  },
});
