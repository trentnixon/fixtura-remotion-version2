/** Design ladder is tuned for ~11 rows; crease motifs consume fixed height per row. */
export const SCORELINE_LADDER_CREASE_MAX_ROWS = 12;

export type ScorelineLadderDensity = "normal" | "compact" | "tight";

export const resolveScorelineLadderDensity = (
  rowCount: number,
): ScorelineLadderDensity => {
  if (rowCount <= 11) {
    return "normal";
  }

  if (rowCount <= 14) {
    return "compact";
  }

  return "tight";
};

export const resolveScorelineLadderShowCreases = (rowCount: number): boolean =>
  rowCount <= SCORELINE_LADDER_CREASE_MAX_ROWS;

export const resolveScorelineLadderShowRowCrease = (
  rowCount: number,
  rowIndex: number,
): boolean => {
  if (!resolveScorelineLadderShowCreases(rowCount)) {
    return false;
  }

  return rowIndex < rowCount - 1;
};
