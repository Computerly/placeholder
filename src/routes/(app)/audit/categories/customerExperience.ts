import type { CategoryDefinition } from "../types";

const customerExperience: CategoryDefinition = {
  title: "Customer Experience",
  criteria: [
    {
      title: "Navigation is easy and intuitive",
      maximumScore: 4,
      score: (_) => 2, // Placeholder
    },
    {
      title: "Mobile usability is high",
      maximumScore: 5,
      score: (lhr) => {
        return lhr.audits["viewport"]?.score === 1 &&
          lhr.audits["mobile-friendly"]?.score !== 0
          ? 5
          : 2;
      },
    },
    {
      title: "No major layout shifts (CLS)",
      maximumScore: 4,
      score: (lhr) => {
        const cls = lhr.audits["cumulative-layout-shift"]?.numericValue ?? 1;
        if (cls <= 0.1) return 4;
        if (cls <= 0.25) return 2;
        return 1;
      },
    },
    {
      title: "Accessible for all users (keyboard, screen readers)",
      maximumScore: 5,
      score: (lhr) => {
        return Math.round((lhr.categories?.accessibility?.score ?? 0) * 5);
      },
    },
    {
      title: "Fast initial interaction (TTI)",
      maximumScore: 2,
      score: (lhr) => {
        const tti = lhr.audits["interactive"]?.numericValue ?? 10000;
        if (tti <= 5000) return 2;
        return 1;
      },
    },
  ],
};

export default customerExperience;
