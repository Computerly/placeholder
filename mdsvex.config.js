import { defineMDSveXConfig } from "mdsvex";
import { join } from "node:path";
import { remarkHeadingsToFrontmatter } from "./src/mdPlugins/mdsvexHeading.js";

const config = defineMDSveXConfig({
  extensions: [".md", ".svx"],
  layout: {
    content: join(import.meta.dirname, "src/lib/layouts/Content.svelte"),
    _: join(import.meta.dirname, "src/lib/layouts/Default.svelte"),
  },
  remarkPlugins: [remarkHeadingsToFrontmatter],
  smartypants: {
    quotes: true,
    ellipses: true,
    dashes: "oldschool",
  },
});

export default config;
