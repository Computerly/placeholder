import type { RunnerResult } from "lighthouse/types/externs";
import type { default as LHResult } from "lighthouse/types/lhr/lhr";
import type { Result as LHRAuditResult } from "lighthouse/types/lhr/audit-result";

export interface AuditContext {
  lhr: LHResult; // Lighthouse report
}

export type Criterion = {
  title: string;
  score: (lhr: LHResult) => number;
  maximumScore?: number; // Max points in category. Each criteria score will be normalized. Default 1
};

export type CategoryDefinition = {
  title: string;
  criteria: Criterion[];
};

export type CategoryResult = {
  category: string; // Category title
  grade: number; // Overall score for the category (0-1)
  criteria: {
    title: string; // Criterion title
    score: number; // Score achieved for this criterion
    maximumScore?: number; // Maximum score for this criterion
    details?: {
      relatedLHR: LHRAuditResult[]; // Related Lighthouse audit results, if applicable
      additionalInfo?: string; // Any additional information or context
      // This could include links, explanations, or other relevant data
    };
  }[];
};

export type AuditResult = {
  initialUrl: string; // URL of the audited page
  compositeScore: number; // Overall score across all categories
  overallGrade: "A" | "B" | "C" | "D"; // Overall grade based on composite score
  categories: CategoryResult[]; // Results for each category
};
