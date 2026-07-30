import type { BroadcastProScoreRole } from "./score-typography";

/** Layout tier for player performance stat presentation. */
export type BroadcastProStatMatrixTier =
  | "featuredTriple"
  | "gridTriple"
  | "performancesTriple"
  | "compact"
  | "resultRow";

export type BroadcastProStatLabelStyle = "full" | "short";

export interface BroadcastProStatMatrixCell {
  label?: string;
  value: string;
  highlight?: boolean;
}

export const BROADCAST_PRO_BATTING_STAT_LABELS = {
  full: { runs: "Runs", balls: "Balls", sr: "SR" },
  short: { runs: "Runs", balls: "Balls", sr: "SR" },
} as const;

export const BROADCAST_PRO_BOWLING_STAT_LABELS = {
  full: { figures: "Figures", overs: "Overs", economy: "Economy" },
  short: { figures: "Figs", overs: "Ov", economy: "Econ" },
} as const;

/** Theme `componentStyles` keys for triple-matrix layout by tier. */
export const BROADCAST_PRO_STAT_MATRIX_TRIPLE_TIER_KEYS: Record<
  Exclude<BroadcastProStatMatrixTier, "compact" | "resultRow">,
  {
    row: string;
    divider: string;
    label: string;
    scoreRole: Extract<
      BroadcastProScoreRole,
      "featuredStat" | "gridStat" | "performancesStat"
    >;
  }
> = {
  featuredTriple: {
    row: "broadcastProStatMatrixTripleFeatured",
    divider: "broadcastProStatMatrixDividerFeatured",
    label: "broadcastProStatMatrixLabel",
    scoreRole: "featuredStat",
  },
  gridTriple: {
    row: "broadcastProStatMatrixTripleGrid",
    divider: "broadcastProStatMatrixDividerGrid",
    label: "broadcastProStatMatrixLabel",
    scoreRole: "gridStat",
  },
  performancesTriple: {
    row: "broadcastProStatMatrixTriplePerformances",
    divider: "broadcastProStatMatrixDividerPerformances",
    label: "broadcastProStatMatrixLabelPerformances",
    scoreRole: "performancesStat",
  },
};

/** Teko score role for matrix value numerals. */
export const resolveBroadcastProStatMatrixScoreRole = (
  tier: BroadcastProStatMatrixTier,
): BroadcastProScoreRole => {
  if (tier === "compact") return "compactStat";
  if (tier === "resultRow") return "playerStatPrimary";
  return BROADCAST_PRO_STAT_MATRIX_TRIPLE_TIER_KEYS[tier].scoreRole;
};

/**
 * Tier-driven accent on stat values — performances highlight col 1;
 * result rows use explicit `cell.highlight`.
 */
export const resolveBroadcastProStatMatrixHighlight = (
  tier: BroadcastProStatMatrixTier,
  cellIndex: number,
  cell?: Pick<BroadcastProStatMatrixCell, "highlight" | "label">,
): boolean => {
  if (cell?.highlight) return true;
  if (tier === "performancesTriple" && cellIndex === 0) {
    return !!cell?.label;
  }
  return false;
};
