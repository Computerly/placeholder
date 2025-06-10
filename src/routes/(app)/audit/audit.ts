import type { CategoryDefinition, AuditResult, CategoryResult } from "./types";
import type { default as LHResult } from "lighthouse/types/lhr/lhr";

const DEFAULT_MAX_SCORE = 1;

async function loadAllCategories(): Promise<CategoryDefinition[]> {
  const modules = import.meta.glob("./categories/*.ts");
  const imports = await Promise.all(
    Object.values(modules).map((load) => load()),
  );

  return imports.map((mod) => (mod as { default: CategoryDefinition }).default);
}

const categories: CategoryDefinition[] = await loadAllCategories();

export function runAudit(lhr: LHResult): AuditResult {
  const results: CategoryResult[] = categories.map((category) => {
    const scoredCriteria = category.criteria.map((criterion) => {
      const score = criterion.score(lhr);
      return {
        title: criterion.title,
        score,
        maximumScore: criterion.maximumScore,
      };
    });

    const totalScore = scoredCriteria.reduce((acc, c) => acc + c.score, 0);
    const totalMax = scoredCriteria.reduce(
      (acc, c) => acc + (c.maximumScore || DEFAULT_MAX_SCORE),
      0,
    );
    const grade = totalScore / totalMax;

    return {
      category: category.title,
      grade,
      criteria: scoredCriteria,
    };
  });

  const compositeScore =
    results.reduce((acc, result) => acc + result.grade, 0) / results.length;
  return {
    initialUrl: lhr.requestedUrl!,
    categories: results,
    compositeScore,
    overallGrade:
      compositeScore >= 0.9
        ? "A"
        : compositeScore >= 0.8
          ? "B"
          : compositeScore >= 0.7
            ? "C"
            : "D",
  };
}
