<template>
  <h1>The Bridge live</h1>

  <p>
    Bilder vom Wettkampf The Bridge am 21. November 2026, direkt aus der
    Halle. Die Seite aktualisiert sich von selbst, neue Fotos erscheinen oben.
  </p>

  <section :class="$style.live">
    <p v-if="!loaded" :class="$style.status">Fotos werden geladen …</p>

    <p v-else-if="photos.length === 0" :class="$style.status">
      Die ersten Fotos folgen in Kürze. Schau bald wieder vorbei!
    </p>

    <template v-else>
      <p :class="$style.status">
        {{ photos.length }} {{ photos.length === 1 ? "Foto" : "Fotos" }} ·
        zuletzt aktualisiert {{ lastChecked }}
      </p>

      <ul :class="$style.grid">
        <li v-for="photo in photos" :key="photo.src">
          <a
            :href="photo.src"
            :class="[$style.thumb, { [$style.fresh]: fresh.has(photo.src) }]"
            @click.prevent="open = photo.src"
          >
            <img
              :src="photo.src"
              alt="Foto vom Wettkampf The Bridge"
              loading="lazy"
              decoding="async"
            />
          </a>
        </li>
      </ul>
    </template>
  </section>

  <div
    v-if="open"
    :class="$style.lightbox"
    role="dialog"
    aria-label="Foto gross anzeigen"
    @click="open = null"
  >
    <img :src="open" alt="Foto vom Wettkampf The Bridge" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "The Bridge live",
  seoTitle: "Wettkampf The Bridge – Live-Fotos",
  description:
    "Live-Fotos vom Boulderwettkampf The Bridge im BOUBA Baden am 21. November 2026. Die Galerie aktualisiert sich laufend.",
});

interface LivePhoto {
  src: string;
  added: number;
}

const source = "/live/the-bridge.json";
const refreshEvery = 30_000;

const photos = ref<LivePhoto[]>([]);
const loaded = ref(false);
const lastChecked = ref("");
const fresh = ref(new Set<string>());
const open = ref<string | null>(null);

async function refresh() {
  try {
    const response = await fetch(`${source}?t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error(String(response.status));
    const next: LivePhoto[] = await response.json();

    if (loaded.value) {
      const known = new Set(photos.value.map((p) => p.src));
      fresh.value = new Set(
        next.filter((p) => !known.has(p.src)).map((p) => p.src),
      );
    }
    photos.value = next;
  } catch {
    // Keep showing what we have; try again on the next tick.
  } finally {
    loaded.value = true;
    lastChecked.value = new Date().toLocaleTimeString("de-CH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

let timer: ReturnType<typeof setInterval> | undefined;

function onKey(event: KeyboardEvent) {
  if (event.key === "Escape") open.value = null;
}

onMounted(() => {
  refresh();
  timer = setInterval(refresh, refreshEvery);
  document.addEventListener("visibilitychange", onVisible);
  document.addEventListener("keydown", onKey);
});

function onVisible() {
  if (document.visibilityState === "visible") refresh();
}

onBeforeUnmount(() => {
  clearInterval(timer);
  document.removeEventListener("visibilitychange", onVisible);
  document.removeEventListener("keydown", onKey);
});
</script>

<style module>
.live {
  padding-top: calc(var(--font-size-h2) / 2);
}

.status {
  margin-bottom: calc(var(--font-size-h2) / 2);
}

.grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--border-size-thick);
}

.thumb {
  display: block;
  width: 100%;
  cursor: zoom-in;
}

.thumb img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.fresh {
  animation: arrive 1.2s ease-out;
}

@keyframes arrive {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: calc(var(--layer-top) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.9);
  cursor: zoom-out;
}

.lightbox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

@media (max-width: 767px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
