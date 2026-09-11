/** Frames after the row-in before each inner tier (Scoreline L→R cascade). */
export const SCORELINE_INNER_TIER_OFFSETS = {
  grade: 4,
  columns: 7,
  rank: 4,
  mark: 7,
  team: 10,
  stats: 13,
  home: 7,
  centre: 10,
  away: 13,
  performances: 16,
  context: 19,
} as const;

export type ScorelineInnerTier = keyof typeof SCORELINE_INNER_TIER_OFFSETS;

export const calculateScorelineInnerDelay = (
  rowDelay: number,
  tier: ScorelineInnerTier,
): number => rowDelay + SCORELINE_INNER_TIER_OFFSETS[tier];
