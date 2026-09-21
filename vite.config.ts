import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: "/personal-portfolio-app/",

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