import type { ResultsLiteSequence } from "../upstreamResultsLiteData";
import type { ResultsLiteVariantConfig } from "../resultsLiteVariantMatrix";

export const getResultsLiteGradeState = (
  sequence: ResultsLiteSequence,
  config: ResultsLiteVariantConfig,
) => {
  const gradeName = sequence.gradeName;
  const showGrade =
    sequence.showGradeHeader && gradeName.trim().length > 0;

  const inlineGradeForIndex = (fixtureIndex: number) =>
    config.gradePlacement === "inlineFirstCard" &&
    showGrade &&
    fixtureIndex === 0
      ? gradeName
      : undefined;

  return { gradeName, showGrade, inlineGradeForIndex };
};
