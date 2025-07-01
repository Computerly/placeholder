import { visit } from "unist-util-visit";
import Slugger from "github-slugger";

/**
 * Remark plugin to:
 * - add id attributes to headings (kebab-case via GitHubSlugger)
 * - extract heading info to frontmatter `headings` array
 */
export function remarkHeadingsToFrontmatter() {
  return (
    /** @type {any} */ tree,
    /** @type {{ data: { fm: any; }; }} */ file,
  ) => {
    const slugger = new Slugger();
    /**
     * @type {{ depth: any; text: any; id: string; }[]}
     */
    const headings = [];

    visit(tree, "heading", (node) => {
      const text = node.children
        .filter(
          (/** @type {{ type: string; }} */ child) =>
            child.type === "text" || child.type === "inlineCode",
        )
        .map((/** @type {{ value: any; }} */ child) => child.value)
        .join(" ")
        .replace(/[^\x00-\x7A]/g, "")
        .trim();

      const id = slugger.slug(text);

      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.id = id;

      headings.push({
        depth: node.depth,
        text,
        id,
      });
    });

    // Append headings to frontmatter (data.fm is how mdsvex stores it)
    file.data.fm = {
      ...(file.data.fm || {}),
      headings,
    };
  };
}
