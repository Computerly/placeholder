import { mdsvex } from "mdsvex";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-vercel";
import tailwindcss from "@tailwindcss/vite";

const config = {
  preprocess: [tailwindcss(), vitePreprocess(), mdsvex()],
  kit: {
    adapter: adapter(),
    csp: {
      directives: {
        "script-src": ["self"],
      },
      // must be specified with either the `report-uri` or `report-to` directives, or both
      reportOnly: {
        "script-src": ["self"],
        "report-uri": ["/"],
      },
    },
  },
  extensions: [".svelte", ".svx"],
};

export default config;
