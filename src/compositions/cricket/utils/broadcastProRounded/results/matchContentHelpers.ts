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

export const calculateBroadcastProRoundedResultDelays = (delay: number) => {
  const baseDelay = delay;
  const statsDelay = baseDelay + 4;
  const headerDelay = statsDelay + 5;

  return {
    baseDelay,
    statsDelay,
    headerDelay,
  };
};

/** Per-cell stagger within a player-stats grid (frames). */
export const RESULT_STAT_CELL_STAGGER = 2;

/**
 * Containers lead their paired copy by this many frames.
 * Pass the copy’s delay into {@link resultContainerDelay}.
 */
export const RESULT_CONTAINER_COPY_LEAD = 3;

/** Container in-delay matched to copy, slightly earlier. */
export const resultContainerDelay = (copyDelay: number): number =>
  Math.max(0, copyDelay - RESULT_CONTAINER_COPY_LEAD);

/** Exit start frame for a results scorecard screen. */
export const calculateBroadcastProRoundedResultExitFrame = (
  fpsScorecard?: number,
): number => (fpsScorecard ? fpsScorecard - 20 : 280);
