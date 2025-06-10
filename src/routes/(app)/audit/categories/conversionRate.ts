import type { CategoryDefinition } from "../types";

const conversionRate: CategoryDefinition = {
  title: "Conversion Rate",
    criteria: [
    {
      title: 'Page Loads Quickly (FCP, LCP)',
      maximumScore: 15,
      score: (lhr) => {
        const fcp = lhr.audits['first-contentful-paint']?.numericValue ?? 0;
        const lcp = lhr.audits['largest-contentful-paint']?.numericValue ?? 0;
        let score = 0;

        if (fcp < 2000) score += 7.5;
        else if (fcp < 4000) score += 5;
        else score += 2.5;

        if (lcp < 2500) score += 7.5;
        else if (lcp < 4000) score += 5;
        else score += 2.5;

        return Math.min(score, 15);
      },
    },
    {
      title: 'Site Feels Responsive (TBT)',
      maximumScore: 10,
      score: (lhr) => {
        const tbt = lhr.audits['total-blocking-time']?.numericValue ?? 0;
        if (tbt < 150) return 10;
        if (tbt < 300) return 7;
        if (tbt < 600) return 4;
        return 1;
      },
    },
    {
      title: 'Minimal Layout Shift (CLS)',
      maximumScore: 5,
      score: (lhr) => {
        const cls = lhr.audits['cumulative-layout-shift']?.numericValue ?? 0;
        if (cls < 0.1) return 5;
        if (cls < 0.25) return 3;
        return 1;
      },
    },
    {
      title: 'Accessible to All Users',
      maximumScore: 10,
      score: (lhr) => {
        const a11yScore = lhr.categories.accessibility?.score ?? 0;
        return a11yScore * 10; // out of 10
      },
    },
    {
      title: 'Call to Action Is Easily Found',
      maximumScore: 5,
      score: (lhr) => {
        const hasSkipLink = lhr.audits['skip-link']?.score ?? 0;
        const linkName = lhr.audits['link-name']?.score ?? 0;

        return ((hasSkipLink + linkName) / 2) * 5;
      },
    },
    {
      title: 'No Console Errors',
      maximumScore: 5,
      score: (lhr) => {
        const errors = lhr.audits['errors-in-console']?.details?.items?.length ?? 0;
        if (errors === 0) return 5;
        if (errors <= 3) return 3;
        return 1;
      },
    },
  ],
};

export default conversionRate;
