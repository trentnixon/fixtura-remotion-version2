import type { BroadcastProRoundedResultMatchData } from "./types";
import { buildCompactVerdictLine } from "./buildBroadcastProRoundedVerdictModel";

export const buildGradeLabel = (
  match: BroadcastProRoundedResultMatchData,
): string => {
  const parts = [match.gradeName || match.type, match.round].filter(Boolean);
  return parts.join(" • ");
};

export const buildBroadcastProRoundedResultStatement = (
  match: BroadcastProRoundedResultMatchData,
): string | null => buildCompactVerdictLine(match);

/** Staggered in-delays for meta → teams/stats → verdict (frames). */
export const calculateBroadcastProRoundedResultDelays = (delay: number) => {
  const baseDelay = delay;
  const metaDelay = baseDelay + 4;
  const homeTeamDelay = metaDelay + 6;
  const homeStatsDelay = homeTeamDelay + 8;
  const awayTeamDelay = homeStatsDelay + 8;
  const awayStatsDelay = awayTeamDelay + 8;
  const verdictDelay = awayStatsDelay + 6;

  return {
    baseDelay,
    metaDelay,
    /** @deprecated Prefer homeStatsDelay / awayStatsDelay */
    statsDelay: homeStatsDelay,
    /** @deprecated Prefer verdictDelay */
    headerDelay: verdictDelay,
    homeTeamDelay,
    homeStatsDelay,
    awayTeamDelay,
    awayStatsDelay,
    verdictDelay,
  };
};

/** Per-cell stagger within a player-stats grid (frames). */
export const RESULT_STAT_CELL_STAGGER = 5;

/** Nested offsets inside a team row (crest → name → score). */
export const RESULT_TEAM_ROW_NESTED = {
  crest: 3,
  name: 6,
  score: 9,
} as const;

/**
 * Containers lead their paired copy by this many frames.
 * Pass the copy’s delay into {@link resultContainerDelay}.
 */
export const RESULT_CONTAINER_COPY_LEAD = 3;

/** Outer results panel delay — slightly before first row/copy. */
export const RESULT_PANEL_CONTAINER_DELAY = 2;

/** Container in-delay matched to copy, slightly earlier. */
export const resultContainerDelay = (copyDelay: number): number =>
  Math.max(0, copyDelay - RESULT_CONTAINER_COPY_LEAD);

/** Exit start frame for a results scorecard screen. */
export const calculateBroadcastProRoundedResultExitFrame = (
  fpsScorecard?: number,
): number => (fpsScorecard ? fpsScorecard - 20 : 280);
