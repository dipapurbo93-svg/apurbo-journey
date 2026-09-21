import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: "/apurbo-journey/",

  tanstackStart: {
    server: {
      entry: "server",
    },

    prerender: {
      enabled: true,
      crawlLinks: true,
    },
  },
});