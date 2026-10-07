/** Design ladder is tuned for ~11 rows; crease motifs consume fixed height per row. */
export const SCORELINE_LADDER_DESIGN_ROWS = 11;
export const SCORELINE_LADDER_CREASE_MAX_ROWS = 12;

/** Team-name sizes for short ladders. 11+ rows stay on the CSS density scale. */
const SCORELINE_LADDER_TEAM_FONT_STEPS = [
  { rows: 4, team: 36, hero: 40 },
  { rows: 6, team: 32, hero: 36 },
  { rows: 8, team: 28, hero: 32 },
  { rows: SCORELINE_LADDER_DESIGN_ROWS, team: 22, hero: 24 },
] as const;

export type ScorelineLadderTeamFont = {
  teamSize: number;
  heroSize: number;
};

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

const interpolateStep = (rowCount: number, key: "team" | "hero"): number => {
  const steps = SCORELINE_LADDER_TEAM_FONT_STEPS;
  const first = steps[0];
  const last = steps[steps.length - 1];

  if (rowCount <= first.rows) {
    return first[key];
  }

  if (rowCount >= last.rows) {
    return last[key];
  }

  for (let index = 0; index < steps.length - 1; index += 1) {
    const start = steps[index];
    const end = steps[index + 1];
    if (rowCount < start.rows || rowCount > end.rows) {
      continue;
    }

    const span = end.rows - start.rows;
    const progress = (rowCount - start.rows) / span;
    return Math.round(start[key] + (end[key] - start[key]) * progress);
  }

  return last[key];
};

/** Larger team names when a short ladder would otherwise leave empty row height. */
export const resolveScorelineLadderTeamFont = (
  rowCount: number,
): ScorelineLadderTeamFont | undefined => {
  if (rowCount <= 0 || rowCount >= SCORELINE_LADDER_DESIGN_ROWS) {
    return undefined;
  }

  return {
    teamSize: interpolateStep(rowCount, "team"),
    heroSize: interpolateStep(rowCount, "hero"),
  };
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
