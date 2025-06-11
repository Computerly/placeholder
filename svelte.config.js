import { mdsvex } from "mdsvex";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from '@sveltejs/adapter-vercel';
import tailwindcss from "@tailwindcss/vite";

const config = {
  preprocess: [
    tailwindcss(),
    vitePreprocess(),
    mdsvex()
  ],
  kit: { adapter: adapter() },
  extensions: [".svelte", ".svx"]
};

export default config;
