<template>
  <AppBar />
  <main>
    <NuxtPage />

    <Navigation class="bottom-nav" />

    <Footer />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const { siteUrl } = useRuntimeConfig().public;

const siteName = "BOUBA Boulder Baden";
const defaultTitle = `${siteName} – Boulderhalle in Baden`;
const defaultDescription =
  "BOUBA ist die Boulderhalle in Baden: rund 200 Boulder auf über 1000 m² Wandfläche, Trainingsbereich, Kinderwelt und Bistro, 7 Minuten vom Bahnhof.";

const title = computed(() => {
  const pageTitle = route.meta.seoTitle ?? route.meta.title;
  return pageTitle ? `${pageTitle} | ${siteName}` : defaultTitle;
});
const description = computed(
  () => route.meta.description ?? defaultDescription,
);
// Static pages are generated as /<page>/index.html, so the served URL ends in a slash.
const canonical = computed(() =>
  new URL(route.path.replace(/\/?$/, "/"), siteUrl).href,
);
const image = new URL("/og-image.jpg", siteUrl).href;

useHead({
  link: [{ rel: "canonical", href: canonical }],
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: canonical,
  ogType: "website",
  ogSiteName: siteName,
  ogLocale: "de_CH",
  ogImage: image,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Boulderhalle BOUBA in Baden",
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
@media (max-width: 767px) {
  .bottom-nav {
    display: none;
  }
}
</style>
