import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProCompositionComponentStylesPlayerRanking } from "./playerRanking";
import { broadcastProCompositionComponentStylesResults } from "./results";

const ranking = broadcastProCompositionComponentStylesPlayerRanking;
const results = broadcastProCompositionComponentStylesResults;

/**
 * Shared player-stat matrix theme keys (ticket 16).
 * Aliases existing player-ranking + results stat surfaces.
 */
export const broadcastProCompositionComponentStylesStatMatrix = {
  broadcastProStatMatrixLabel: ranking.broadcastProPlayerRankingStatLabel,
  broadcastProStatMatrixTripleFeatured:
    ranking.broadcastProPlayerRankingTripleStatsFeatured,
  broadcastProStatMatrixTripleGrid:
    ranking.broadcastProPlayerRankingTripleStatsGridTop5,
  broadcastProStatMatrixTriplePerformances:
    ranking.broadcastProPlayerRankingTripleStatsPerformances,
  broadcastProStatMatrixDividerFeatured:
    ranking.broadcastProPlayerRankingStatDividerFeatured,
  broadcastProStatMatrixDividerGrid:
    ranking.broadcastProPlayerRankingStatDividerGridTop5,
  broadcastProStatMatrixDividerPerformances:
    ranking.broadcastProPlayerRankingStatDividerPerformances,
  broadcastProStatMatrixResultGrid: results.broadcastProResultsPlayerStatsGrid,
  broadcastProStatMatrixResultCell: results.broadcastProResultsPlayerStatCell,
  broadcastProStatMatrixResultName: results.broadcastProResultsPlayerStatName,
  broadcastProStatMatrixResultValue: results.broadcastProResultsPlayerStatValue,
} satisfies Pick<
  ThemeComponentStyles,
  | "broadcastProStatMatrixLabel"
  | "broadcastProStatMatrixTripleFeatured"
  | "broadcastProStatMatrixTripleGrid"
  | "broadcastProStatMatrixTriplePerformances"
  | "broadcastProStatMatrixDividerFeatured"
  | "broadcastProStatMatrixDividerGrid"
  | "broadcastProStatMatrixDividerPerformances"
  | "broadcastProStatMatrixResultGrid"
  | "broadcastProStatMatrixResultCell"
  | "broadcastProStatMatrixResultName"
  | "broadcastProStatMatrixResultValue"
>;
