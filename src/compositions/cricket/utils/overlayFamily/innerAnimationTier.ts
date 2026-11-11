/** Frames after row-in before each inner tier (shared L→R cascade on overlay canvases). */
export const OVERLAY_INNER_TIER_OFFSETS = {
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

export type OverlayInnerTier = keyof typeof OVERLAY_INNER_TIER_OFFSETS;

export const calculateOverlayInnerDelay = (
  rowDelay: number,
  tier: OverlayInnerTier,
): number => rowDelay + OVERLAY_INNER_TIER_OFFSETS[tier];
