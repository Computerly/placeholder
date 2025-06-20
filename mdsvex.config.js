import { defineMDSveXConfig } from "mdsvex";
import { join } from "node:path";

const config = defineMDSveXConfig({
  extensions: [".md", ".svx"],
  layout: {
    _: join(import.meta.dirname, "src/lib/layouts/Default.svelte"),
  },
  smartypants: {
    quotes: true,
    ellipses: true,
    dashes: "oldschool",
  },
});

export default config;
