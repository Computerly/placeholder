import { mdsvex } from "mdsvex";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-vercel";
import tailwindcss from "@tailwindcss/vite";
import { default as mdsvexOptions } from "./mdsvex.config.js";

const config = {
  preprocess: [tailwindcss(), vitePreprocess(), mdsvex(mdsvexOptions)],
  kit: {
    adapter: adapter(),
    csp: {
      directives: { "script-src": ["self"] },
      reportOnly: {
        "script-src": ["self"],
        "report-uri": ["/"],
      },
    },
  },
  extensions: [".svelte", ...mdsvexOptions.extensions],
};

export default config;
