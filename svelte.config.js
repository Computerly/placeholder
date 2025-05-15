import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

const config = {
  preprocess: [tailwindcss(), vitePreprocess(), mdsvex()],
  kit: { adapter: adapter() },
  extensions: [".svelte", ".svx"],
};

export default config;
