import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProComponentStylesShared } from "../componentStyles.shared";

const broadcastProPlayerRankingStatScoreFeatured = {
  className: "font-teko text-9xl font-semibold tracking-tight leading-none",
};

const broadcastProPlayerRankingStatScoreGrid = {
  className: "font-teko text-6xl font-semibold tracking-tight leading-none",
};

/**
 * Shared Broadcast Pro player-ranking surfaces (Top 5 + Performances).
 */
export const broadcastProCompositionComponentStylesPlayerRanking = {
  broadcastProPlayerRankingAnimatedContainer: {
    className:
      "mx-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-none md:mx-6",
  },
  broadcastProPlayerRankingScrollShell: {
    className: "flex min-h-0 flex-1 flex-col overflow-hidden py-0",
  },
  broadcastProPlayerRankingContentStack: {
    className: "flex w-full flex-col justify-start gap-2",
  },
  broadcastProPlayerRankingGridTop5: {
    className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
  },
  broadcastProPlayerRankingGridPerformances: {
    className: "grid w-full grid-cols-2 content-start gap-2",
  },
  broadcastProPlayerRankingFeaturedInner: {
    className: "relative flex flex-col overflow-hidden",
  },
  broadcastProPlayerRankingFeaturedBody: {
    className: "flex items-center gap-6 px-6 pb-4 pt-10 pr-4",
  },
  broadcastProPlayerRankingGridCard: {
    className:
      "relative flex shrink-0 items-stretch gap-2 overflow-hidden p-3 pt-8 sm:gap-3 sm:p-4 sm:pt-9",
  },
  broadcastProPlayerRankingRankBadgeFeaturedLeft: {
    className:
      "absolute left-0 top-0 px-3 py-1 font-teko text-2xl italic leading-none",
  },
  broadcastProPlayerRankingRankBadgeGridLeft: {
    className:
      "absolute left-0 top-0 px-3 py-1 font-teko text-2xl italic leading-none",
  },
  broadcastProPlayerRankingRankBadgeGridRight: {
    className:
      "absolute right-0 top-0 px-3 py-1 font-teko text-lg font-bold italic tracking-wide leading-none",
  },
  broadcastProPlayerRankingLogoWellFeatured:
    broadcastProComponentStylesShared.broadcastProCrestWellFeatured,
  broadcastProPlayerRankingLogoWellGrid:
    broadcastProComponentStylesShared.broadcastProCrestWellGrid,
  broadcastProPlayerRankingNameFeatured: {
    className:
      "text-lift text-6xl font-semibold uppercase leading-none tracking-normal md:text-7xl",
  },
  broadcastProPlayerRankingNameGridTop5: {
    className:
      "text-lift truncate text-2xl font-medium uppercase leading-snug sm:text-3xl",
  },
  broadcastProPlayerRankingNameGridPerformances: {
    className:
      "text-lift line-clamp-2 text-[28px] font-semibold uppercase leading-none sm:text-[32px]",
  },
  broadcastProPlayerRankingTeamFeatured: {
    className:
      "font-rajdhani mt-1 text-2xl font-semibold uppercase tracking-[0.2em]",
  },
  broadcastProPlayerRankingTeamGridTop5: {
    className:
      "font-rajdhani mt-0.5 text-sm font-bold uppercase leading-tight tracking-[0.15em]",
  },
  broadcastProPlayerRankingTeamGridPerformances: {
    className:
      "font-rajdhani mb-2 mt-1 text-sm font-bold uppercase tracking-[0.2em]",
  },
  broadcastProPlayerRankingStatLabel: {
    className:
      "font-rajdhani mb-0.5 text-base font-bold uppercase tracking-widest",
  },
  broadcastProPlayerRankingStatLabelPerformances: {
    className:
      "font-rajdhani mb-0.5 text-xl font-bold uppercase tracking-widest",
  },
  broadcastProPlayerRankingStatValueFeatured:
    broadcastProPlayerRankingStatScoreFeatured,
  broadcastProPlayerRankingStatValueGrid:
    broadcastProPlayerRankingStatScoreGrid,
  broadcastProScoreFeatured: broadcastProPlayerRankingStatScoreFeatured,
  broadcastProScoreGrid: broadcastProPlayerRankingStatScoreGrid,
  broadcastProPlayerRankingTripleStatsFeatured: {
    className: "mt-4 grid w-full grid-cols-3",
  },
  broadcastProPlayerRankingTripleStatsGridTop5: {
    className: "mt-1.5 grid w-full grid-cols-3",
  },
  broadcastProPlayerRankingTripleStatsPerformances: {
    className: "mt-1.5 grid w-full grid-cols-3 border-t pt-2",
  },
  broadcastProPlayerRankingStatDividerFeatured: {
    className: "w-full min-w-0 border-l pl-3 sm:pl-4",
  },
  broadcastProPlayerRankingStatDividerGridTop5: {
    className: "w-full min-w-0 border-l pl-2 sm:pl-3",
  },
  broadcastProPlayerRankingStatDividerPerformances: {
    className: "w-full min-w-0 border-l pl-2 sm:pl-3",
  },
} satisfies Pick<
  ThemeComponentStyles,
  | "broadcastProPlayerRankingAnimatedContainer"
  | "broadcastProPlayerRankingScrollShell"
  | "broadcastProPlayerRankingContentStack"
  | "broadcastProPlayerRankingGridTop5"
  | "broadcastProPlayerRankingGridPerformances"
  | "broadcastProPlayerRankingFeaturedInner"
  | "broadcastProPlayerRankingFeaturedBody"
  | "broadcastProPlayerRankingGridCard"
  | "broadcastProPlayerRankingRankBadgeFeaturedLeft"
  | "broadcastProPlayerRankingRankBadgeGridLeft"
  | "broadcastProPlayerRankingRankBadgeGridRight"
  | "broadcastProPlayerRankingLogoWellFeatured"
  | "broadcastProPlayerRankingLogoWellGrid"
  | "broadcastProPlayerRankingNameFeatured"
  | "broadcastProPlayerRankingNameGridTop5"
  | "broadcastProPlayerRankingNameGridPerformances"
  | "broadcastProPlayerRankingTeamFeatured"
  | "broadcastProPlayerRankingTeamGridTop5"
  | "broadcastProPlayerRankingTeamGridPerformances"
  | "broadcastProPlayerRankingStatLabel"
  | "broadcastProPlayerRankingStatLabelPerformances"
  | "broadcastProPlayerRankingStatValueFeatured"
  | "broadcastProPlayerRankingStatValueGrid"
  | "broadcastProScoreFeatured"
  | "broadcastProScoreGrid"
  | "broadcastProPlayerRankingTripleStatsFeatured"
  | "broadcastProPlayerRankingTripleStatsGridTop5"
  | "broadcastProPlayerRankingTripleStatsPerformances"
  | "broadcastProPlayerRankingStatDividerFeatured"
  | "broadcastProPlayerRankingStatDividerGridTop5"
  | "broadcastProPlayerRankingStatDividerPerformances"
>;
