import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import TurboConsole from "unplugin-turbo-console/vite";
import { VitePluginRadar } from "vite-plugin-radar";

export default defineConfig({
  plugins: [
    tailwindcss(),
    enhancedImages(),
    TurboConsole({}),
    VitePluginRadar({
      // Google Analytics tag injection
      enableDev: false,
      microsoftClarity: {
        id: "s20spn8kpk",
      },
    }),
    sveltekit(),
  ],
  test: {
    projects: [
      {
        extends: "./vite.config.ts",
        plugins: [svelteTesting()],
        test: {
          name: "client",
          environment: "jsdom",
          clearMocks: true,
          include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
          exclude: ["src/lib/server/**"],
          setupFiles: ["./vitest-setup-client.ts"],
        },
      },
      {
        extends: "./vite.config.ts",
        test: {
          name: "server",
          environment: "node",
          include: ["src/**/*.{test,spec}.{js,ts}"],
          exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"],
        },
      },
    ],
  },
});
