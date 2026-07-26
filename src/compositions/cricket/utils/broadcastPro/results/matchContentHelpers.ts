import type { BroadcastProResultMatchData } from "./types";
import { buildCompactVerdictLine } from "./buildBroadcastProVerdictModel";

export const buildGradeLabel = (match: BroadcastProResultMatchData): string => {
  const parts = [match.gradeName || match.type, match.round].filter(Boolean);
  return parts.join(" • ");
};

export const buildBroadcastProResultStatement = (
  match: BroadcastProResultMatchData,
): string | null => buildCompactVerdictLine(match);

export const calculateBroadcastProResultDelays = (delay: number) => {
  const baseDelay = delay;
  const statsDelay = baseDelay + 4;
  const headerDelay = statsDelay + 5;

  return {
    baseDelay,
    statsDelay,
    headerDelay,
  };
};
