import type { CategoryDefinition } from "../types";

const discoverability: CategoryDefinition = {
  title: "Discoverability",
  criteria: [
    {
      title: "Page title is present and meaningful",
      maximumScore: 4,
      score: (lhr) => {
        const titleLength =
          lhr.audits["document-title"]?.details?.items?.[0]?.title?.length ?? 0;
        return titleLength > 10 ? 4 : 1;
      },
    },
    {
      title: "Meta description present",
      maximumScore: 4,
      score: (lhr) => {
        return lhr.audits["meta-description"]?.score === 1 ? 4 : 0;
      },
    },
    {
      title: "Descriptive headings used",
      maximumScore: 4,
      score: (lhr) => {
        return lhr.audits["heading-order"]?.score === 1 ? 4 : 1;
      },
    },
    {
      title: "robots.txt and sitemap.xml present",
      maximumScore: 4,
      score: (_) => 3, // Placeholder — needs server fetch
    },
    {
      title: "Social tags (OG/Twitter) configured",
      maximumScore: 4,
      score: (_) => 2, // Placeholder
    },
  ],
};

export default discoverability;
