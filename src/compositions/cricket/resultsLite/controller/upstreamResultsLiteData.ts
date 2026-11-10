import { MatchResult } from "../../results/_types/types";
import {
  calculateTotalScreens,
  castToMatchResults,
} from "../../results/_utils/calculations";

/** Scheduler payload: one grade block with nested fixtures. */
export type ResultsLiteGradeBlock = {
  grade: {
    gradeName?: string;
    [key: string]: unknown;
  };
  fixtures: unknown[];
};

/** One TransitionSeries sequence: fixtures from a single grade, up to perScreen. */
export type ResultsLiteSequence = {
  gradeName: string;
  /** True when this sequence should show the grade banner (every sequence for that grade). */
  showGradeHeader: boolean;
  fixtures: MatchResult[];
};

const isGradeBlock = (item: unknown): item is ResultsLiteGradeBlock => {
  if (typeof item !== "object" || item === null) {
    return false;
  }
  return Array.isArray((item as ResultsLiteGradeBlock).fixtures);
};

/** Read upstream grouped `data` as grade blocks (no re-grouping). */
export const parseResultsLiteGradeBlocks = (
  raw: unknown,
): ResultsLiteGradeBlock[] => {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.filter(isGradeBlock);
};

export const hasResultsLiteGradeBlocks = (raw: unknown): boolean => {
  return parseResultsLiteGradeBlocks(raw).some(
    (block) => block.fixtures.length > 0,
  );
};

export const countResultsLiteFixtures = (
  blocks: ResultsLiteGradeBlock[],
): number => {
  return blocks.reduce((total, block) => total + block.fixtures.length, 0);
};

/**
 * Build one sequence per paginated chunk within each grade block. A new upstream
 * grade always starts a new sequence (never continues on a partial prior screen).
 */
export const buildResultsLiteSequences = (
  blocks: ResultsLiteGradeBlock[],
  perScreen: number,
): ResultsLiteSequence[] => {
  const sequences: ResultsLiteSequence[] = [];

  for (const block of blocks) {
    const gradeName = block.grade?.gradeName?.trim() ?? "";
    const fixtures = castToMatchResults(block.fixtures);
    const screensForGrade = calculateTotalScreens(fixtures.length, perScreen);

    for (
      let screenInGrade = 0;
      screenInGrade < screensForGrade;
      screenInGrade++
    ) {
      const start = screenInGrade * perScreen;
      sequences.push({
        gradeName,
        showGradeHeader: gradeName.length > 0,
        fixtures: fixtures.slice(start, start + perScreen),
      });
    }
  }

  return sequences;
};
