import type { CategoryDefinition } from "../types";

const branding: CategoryDefinition = {
  title: "Branding & Identity",
  criteria: [
    {
      title: "Site uses favicon",
      maximumScore: 1,
      score: (lhr) => {
        return lhr.audits["apple-touch-icon"]?.score === 1 ? 1 : 0;
      },
    },
    {
      title: "Theme color or brand color is set",
      maximumScore: 1,
      score: (lhr) => {
        return lhr.audits["themed-omnibox"]?.score === 1 ? 1 : 0;
      },
    },
    {
      title: "Brand/logo clearly visible",
      maximumScore: 3,
      score: (_) => 2, // Placeholder
    },
    {
      title: "Typography and design are consistent",
      maximumScore: 3,
      score: (_) => 2, // Placeholder
    },
    {
      title: "Navigation reinforces brand identity",
      maximumScore: 2,
      score: (_) => 1, // Placeholder
    },
  ],
};

export default branding;
