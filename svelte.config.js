import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from '@sveltejs/adapter-vercel';
import tailwindcss from "@tailwindcss/vite";

const config = {
  preprocess: [tailwindcss(), vitePreprocess()],
  kit: { adapter: adapter() },
  extensions: [".svelte"],
};

export default config;
