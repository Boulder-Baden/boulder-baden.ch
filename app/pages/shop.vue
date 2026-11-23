<template>
  <h1>Shop</h1>

  <div id="drp-booking" data-gift-card="true"></div>
</template>

<script setup lang="ts">
definePageMeta({
  footer: true,
  order: 140,
  title: "Shop",
  seoTitle: "Shop & Gutscheine",
  description:
    "Gutscheine für die Boulderhalle BOUBA in Baden online kaufen. Das ideale Geschenk für Boulderinnen, Boulderer und alle, die es werden wollen.",
});

const name = "shop";

useHead({
  script: [
    {
      id: "drp-script",
      src: "https://www.dr-plano.com/ch/static/booking-plugin/code.js",
      "data-backend-url": "https://backend.dr-plano.com",
      "data-id": "371288419",
      "data-frontend-url": "https://www.dr-plano.com/ch",
      tagPosition: "bodyClose",
    },
  ],
});
</script>
