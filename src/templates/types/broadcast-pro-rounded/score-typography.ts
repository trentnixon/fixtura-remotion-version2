/**
 * Broadcast Pro structured score typography — Teko numeral roles and compact sizing.
 * Set on {@link TemplateThemeConfig.broadcastProRoundedScoreSizing} in `variants/broadcastProRounded/theme/tokens.ts`.
 */

export type BroadcastProRoundedScoreRole =
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
  | "performancesStat"
  | "compactStat"
  | "matchDivider"
  | "rosterIndex";

/** Full Tailwind class strings for compact ladder/upcoming surfaces. */
export interface BroadcastProRoundedScoreCompactClasses {
  tableRank: string;
  tableStat: string;
  tablePoints: string;
  matchDivider: string;
}

export interface BroadcastProRoundedScoreSizing {
  compact: BroadcastProRoundedScoreCompactClasses;
}

export const DEFAULT_BROADCAST_PRO_SCORE_SIZING: BroadcastProRoundedScoreSizing =
  {
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
  BroadcastProRoundedScoreRole,
  string
> = {
  matchTotal: "broadcastProRoundedScoreMatchTotal",
  matchInnings: "broadcastProRoundedScoreMatchInnings",
  matchYetToBat: "broadcastProRoundedScoreMatchYetToBat",
  playerStatPrimary: "broadcastProRoundedScorePlayerPrimary",
  playerStatSuffix: "broadcastProRoundedScorePlayerSuffix",
  tableRank: "broadcastProRoundedScoreTableRank",
  tableStat: "broadcastProRoundedScoreTableStat",
  tablePoints: "broadcastProRoundedScoreTablePoints",
  featuredStat: "broadcastProRoundedScoreFeatured",
  gridStat: "broadcastProRoundedScoreGrid",
  performancesStat: "broadcastProRoundedScorePerformances",
  compactStat: "broadcastProRoundedScoreCompact",
  matchDivider: "broadcastProRoundedScoreDivider",
  rosterIndex: "broadcastProRoundedScoreRosterIndex",
};

/** AnimatedText `type` for roles that reuse global primitive keys. */
export const BROADCAST_PRO_SCORE_ROLE_ANIMATED_TYPE: Record<
  BroadcastProRoundedScoreRole,
  string
> = {
  matchTotal: "ResultScore",
  matchInnings: "ResultScoreFirstInnings",
  matchYetToBat: "ResultScoreYetToBat",
  playerStatPrimary: "ResultPlayerScore",
  playerStatSuffix: "broadcastProRoundedScorePlayerSuffix",
  tableRank: "ladderTeamPoints",
  tableStat: "ladderTeamPoints",
  tablePoints: "ladderTeamPoints",
  featuredStat: "broadcastProRoundedScoreFeatured",
  gridStat: "broadcastProRoundedScoreGrid",
  performancesStat: "broadcastProRoundedScorePerformances",
  compactStat: "TeamOfTheWeekStat",
  matchDivider: "ResultVS",
  rosterIndex: "bodyText",
};
