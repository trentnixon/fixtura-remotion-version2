import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProRoundedComponentStylesShared } from "../componentStyles.shared";

const broadcastProRoundedPlayerRankingStatScoreFeatured = {
  className: "font-teko text-9xl font-semibold tracking-tight leading-none",
};

const broadcastProRoundedPlayerRankingStatScoreGrid = {
  className: "font-teko text-6xl font-semibold tracking-tight leading-none",
};

/**
 * Shared Broadcast Pro player-ranking surfaces (Top 5 + Performances).
 */
export const broadcastProRoundedCompositionComponentStylesPlayerRanking = {
  broadcastProRoundedPlayerRankingAnimatedContainer: {
    className:
      "mx-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl md:mx-6",
  },
  broadcastProRoundedPlayerRankingScrollShell: {
    className: "flex min-h-0 flex-1 flex-col overflow-hidden py-0",
  },
  broadcastProRoundedPlayerRankingContentStack: {
    className: "flex w-full flex-col justify-start gap-2",
  },
  broadcastProRoundedPlayerRankingGridTop5: {
    className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
  },
  broadcastProRoundedPlayerRankingGridPerformances: {
    className: "grid w-full grid-cols-2 content-start gap-2",
  },
  broadcastProRoundedPlayerRankingFeaturedInner: {
    className: "relative flex flex-col overflow-hidden",
  },
  broadcastProRoundedPlayerRankingFeaturedBody: {
    className: "flex items-center gap-6 px-6 pb-4 pt-10 pr-4",
  },
  broadcastProRoundedPlayerRankingGridCard: {
    className:
      "relative flex shrink-0 items-stretch gap-2 overflow-hidden p-3 pt-8 sm:gap-3 sm:p-4 sm:pt-9",
  },
  broadcastProRoundedPlayerRankingRankBadgeFeaturedLeft: {
    className:
      "absolute left-0 top-0 px-3 py-1 font-teko text-2xl italic leading-none",
  },
  broadcastProRoundedPlayerRankingRankBadgeGridLeft: {
    className:
      "absolute left-0 top-0 px-3 py-1 font-teko text-2xl italic leading-none",
  },
  broadcastProRoundedPlayerRankingRankBadgeGridRight: {
    className:
      "absolute right-0 top-0 px-3 py-1 font-teko text-lg font-bold italic tracking-wide leading-none",
  },
  broadcastProRoundedPlayerRankingLogoWellFeatured:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedCrestWellFeatured,
  broadcastProRoundedPlayerRankingLogoWellGrid:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedCrestWellGrid,
  broadcastProRoundedPlayerRankingNameFeatured: {
    className:
      "text-lift text-6xl font-semibold uppercase leading-none tracking-normal md:text-7xl",
  },
  broadcastProRoundedPlayerRankingNameGridTop5: {
    className:
      "text-lift truncate text-2xl font-medium uppercase leading-snug sm:text-3xl",
  },
  broadcastProRoundedPlayerRankingNameGridPerformances: {
    className:
      "text-lift line-clamp-2 text-[28px] font-semibold uppercase leading-none sm:text-[32px]",
  },
  broadcastProRoundedPlayerRankingTeamFeatured: {
    className:
      "font-rajdhani mt-1 text-2xl font-semibold uppercase tracking-[0.2em]",
  },
  broadcastProRoundedPlayerRankingTeamGridTop5: {
    className:
      "font-rajdhani mt-0.5 text-sm font-bold uppercase leading-tight tracking-[0.15em]",
  },
  broadcastProRoundedPlayerRankingTeamGridPerformances: {
    className:
      "font-rajdhani mb-2 mt-1 text-sm font-bold uppercase tracking-[0.2em]",
  },
  broadcastProRoundedPlayerRankingStatLabel: {
    className:
      "font-rajdhani mb-0.5 text-base font-bold uppercase tracking-widest",
  },
  broadcastProRoundedPlayerRankingStatLabelPerformances: {
    className:
      "font-rajdhani mb-0.5 text-xl font-bold uppercase tracking-widest",
  },
  broadcastProRoundedPlayerRankingStatValueFeatured:
    broadcastProRoundedPlayerRankingStatScoreFeatured,
  broadcastProRoundedPlayerRankingStatValueGrid:
    broadcastProRoundedPlayerRankingStatScoreGrid,
  broadcastProRoundedScoreFeatured: broadcastProRoundedPlayerRankingStatScoreFeatured,
  broadcastProRoundedScoreGrid: broadcastProRoundedPlayerRankingStatScoreGrid,
  broadcastProRoundedPlayerRankingTripleStatsFeatured: {
    className: "mt-4 grid w-full grid-cols-3",
  },
  broadcastProRoundedPlayerRankingTripleStatsGridTop5: {
    className: "mt-1.5 grid w-full grid-cols-3",
  },
  broadcastProRoundedPlayerRankingTripleStatsPerformances: {
    className: "mt-1.5 grid w-full grid-cols-3 border-t pt-2",
  },
  broadcastProRoundedPlayerRankingStatDividerFeatured: {
    className: "w-full min-w-0 border-l pl-3 sm:pl-4",
  },
  broadcastProRoundedPlayerRankingStatDividerGridTop5: {
    className: "w-full min-w-0 border-l pl-2 sm:pl-3",
  },
  broadcastProRoundedPlayerRankingStatDividerPerformances: {
    className: "w-full min-w-0 border-l pl-2 sm:pl-3",
  },
} satisfies Pick<
  ThemeComponentStyles,
  | "broadcastProRoundedPlayerRankingAnimatedContainer"
  | "broadcastProRoundedPlayerRankingScrollShell"
  | "broadcastProRoundedPlayerRankingContentStack"
  | "broadcastProRoundedPlayerRankingGridTop5"
  | "broadcastProRoundedPlayerRankingGridPerformances"
  | "broadcastProRoundedPlayerRankingFeaturedInner"
  | "broadcastProRoundedPlayerRankingFeaturedBody"
  | "broadcastProRoundedPlayerRankingGridCard"
  | "broadcastProRoundedPlayerRankingRankBadgeFeaturedLeft"
  | "broadcastProRoundedPlayerRankingRankBadgeGridLeft"
  | "broadcastProRoundedPlayerRankingRankBadgeGridRight"
  | "broadcastProRoundedPlayerRankingLogoWellFeatured"
  | "broadcastProRoundedPlayerRankingLogoWellGrid"
  | "broadcastProRoundedPlayerRankingNameFeatured"
  | "broadcastProRoundedPlayerRankingNameGridTop5"
  | "broadcastProRoundedPlayerRankingNameGridPerformances"
  | "broadcastProRoundedPlayerRankingTeamFeatured"
  | "broadcastProRoundedPlayerRankingTeamGridTop5"
  | "broadcastProRoundedPlayerRankingTeamGridPerformances"
  | "broadcastProRoundedPlayerRankingStatLabel"
  | "broadcastProRoundedPlayerRankingStatLabelPerformances"
  | "broadcastProRoundedPlayerRankingStatValueFeatured"
  | "broadcastProRoundedPlayerRankingStatValueGrid"
  | "broadcastProRoundedScoreFeatured"
  | "broadcastProRoundedScoreGrid"
  | "broadcastProRoundedPlayerRankingTripleStatsFeatured"
  | "broadcastProRoundedPlayerRankingTripleStatsGridTop5"
  | "broadcastProRoundedPlayerRankingTripleStatsPerformances"
  | "broadcastProRoundedPlayerRankingStatDividerFeatured"
  | "broadcastProRoundedPlayerRankingStatDividerGridTop5"
  | "broadcastProRoundedPlayerRankingStatDividerPerformances"
>;
