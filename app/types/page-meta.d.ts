declare module "#app" {
  interface PageMeta {
    /** Longer, search-friendly title. Falls back to `title`. */
    seoTitle?: string;
    /** Meta description (about 120–155 characters). */
    description?: string;
  }
}

export {};
