/**
 * Broadcast Pro structured score typography — Teko numeral roles and compact sizing.
 * Set on {@link TemplateThemeConfig.broadcastProScoreSizing} in `variants/broadcastPro/theme/tokens.ts`.
 */

export type BroadcastProScoreRole =
  | "matchTotal"
  | "matchInnings"
  | "matchYetToBat"
  | "playerStatPrimary"
  | "playerStatSuffix"
  | "tableRank"
  | "tableStat"
  | "tablePoints"
  | "featuredStat"
  | "gridStat"
  | "compactStat"
  | "matchDivider"
  | "rosterIndex";

/** Full Tailwind class strings for compact ladder/upcoming surfaces. */
export interface BroadcastProScoreCompactClasses {
  tableRank: string;
  tableStat: string;
  tablePoints: string;
  matchDivider: string;
}

export interface BroadcastProScoreSizing {
  compact: BroadcastProScoreCompactClasses;
}

export const DEFAULT_BROADCAST_PRO_SCORE_SIZING: BroadcastProScoreSizing = {
  compact: {
    tableRank:
      "font-teko text-5xl font-normal tracking-tight leading-none uppercase",
    tableStat: "font-teko text-3xl font-normal tracking-tight leading-none",
    tablePoints:
      "font-teko text-4xl font-bold tracking-tight leading-none text-center",
    matchDivider:
      "font-teko text-3xl font-bold italic uppercase tracking-tight leading-none",
  },
};

/** Maps semantic score roles to `componentStyles` keys. */
export const BROADCAST_PRO_SCORE_ROLE_THEME_KEY: Record<
  BroadcastProScoreRole,
  string
> = {
  matchTotal: "broadcastProScoreMatchTotal",
  matchInnings: "broadcastProScoreMatchInnings",
  matchYetToBat: "broadcastProScoreMatchYetToBat",
  playerStatPrimary: "broadcastProScorePlayerPrimary",
  playerStatSuffix: "broadcastProScorePlayerSuffix",
  tableRank: "broadcastProScoreTableRank",
  tableStat: "broadcastProScoreTableStat",
  tablePoints: "broadcastProScoreTablePoints",
  featuredStat: "broadcastProScoreFeatured",
  gridStat: "broadcastProScoreGrid",
  compactStat: "broadcastProScoreCompact",
  matchDivider: "broadcastProScoreDivider",
  rosterIndex: "broadcastProScoreRosterIndex",
};

/** AnimatedText `type` for roles that reuse global primitive keys. */
export const BROADCAST_PRO_SCORE_ROLE_ANIMATED_TYPE: Record<
  BroadcastProScoreRole,
  string
> = {
  matchTotal: "ResultScore",
  matchInnings: "ResultScoreFirstInnings",
  matchYetToBat: "ResultScoreYetToBat",
  playerStatPrimary: "ResultPlayerScore",
  playerStatSuffix: "broadcastProScorePlayerSuffix",
  tableRank: "ladderTeamPoints",
  tableStat: "ladderTeamPoints",
  tablePoints: "ladderTeamPoints",
  featuredStat: "broadcastProScoreFeatured",
  gridStat: "broadcastProScoreGrid",
  compactStat: "TeamOfTheWeekStat",
  matchDivider: "ResultVS",
  rosterIndex: "bodyText",
};
