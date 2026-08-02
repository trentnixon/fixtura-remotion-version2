import type { BroadcastProRoundedResultMatchData } from "./types";
import { buildCompactVerdictLine } from "./buildBroadcastProRoundedVerdictModel";

export const buildGradeLabel = (match: BroadcastProRoundedResultMatchData): string => {
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
