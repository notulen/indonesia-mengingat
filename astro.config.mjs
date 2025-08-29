import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://notulen.id",
  base: "/indonesia-mengingat",
  trailingSlash: "never",

  integrations: [mdx(), react()],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["react-tweet"],
    },
  },
});
