import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProRoundedCompositionComponentStylesPlayerRanking } from "./playerRanking";
import { broadcastProRoundedCompositionComponentStylesResults } from "./results";

const ranking = broadcastProRoundedCompositionComponentStylesPlayerRanking;
const results = broadcastProRoundedCompositionComponentStylesResults;

/**
 * Shared player-stat matrix theme keys (ticket 16).
 * Aliases existing player-ranking + results stat surfaces.
 */
export const broadcastProRoundedCompositionComponentStylesStatMatrix = {
  broadcastProRoundedStatMatrixLabel: ranking.broadcastProRoundedPlayerRankingStatLabel,
  broadcastProRoundedStatMatrixLabelPerformances:
    ranking.broadcastProRoundedPlayerRankingStatLabelPerformances,
  broadcastProRoundedStatMatrixTripleFeatured:
    ranking.broadcastProRoundedPlayerRankingTripleStatsFeatured,
  broadcastProRoundedStatMatrixTripleGrid:
    ranking.broadcastProRoundedPlayerRankingTripleStatsGridTop5,
  broadcastProRoundedStatMatrixTriplePerformances:
    ranking.broadcastProRoundedPlayerRankingTripleStatsPerformances,
  broadcastProRoundedStatMatrixDividerFeatured:
    ranking.broadcastProRoundedPlayerRankingStatDividerFeatured,
  broadcastProRoundedStatMatrixDividerGrid:
    ranking.broadcastProRoundedPlayerRankingStatDividerGridTop5,
  broadcastProRoundedStatMatrixDividerPerformances:
    ranking.broadcastProRoundedPlayerRankingStatDividerPerformances,
  broadcastProRoundedStatMatrixResultGrid: results.broadcastProRoundedResultsPlayerStatsGrid,
  broadcastProRoundedStatMatrixResultCell: results.broadcastProRoundedResultsPlayerStatCell,
  broadcastProRoundedStatMatrixResultName: results.broadcastProRoundedResultsPlayerStatName,
  broadcastProRoundedStatMatrixResultValue: results.broadcastProRoundedResultsPlayerStatValue,
} satisfies Pick<
  ThemeComponentStyles,
  | "broadcastProRoundedStatMatrixLabel"
  | "broadcastProRoundedStatMatrixLabelPerformances"
  | "broadcastProRoundedStatMatrixTripleFeatured"
  | "broadcastProRoundedStatMatrixTripleGrid"
  | "broadcastProRoundedStatMatrixTriplePerformances"
  | "broadcastProRoundedStatMatrixDividerFeatured"
  | "broadcastProRoundedStatMatrixDividerGrid"
  | "broadcastProRoundedStatMatrixDividerPerformances"
  | "broadcastProRoundedStatMatrixResultGrid"
  | "broadcastProRoundedStatMatrixResultCell"
  | "broadcastProRoundedStatMatrixResultName"
  | "broadcastProRoundedStatMatrixResultValue"
>;
