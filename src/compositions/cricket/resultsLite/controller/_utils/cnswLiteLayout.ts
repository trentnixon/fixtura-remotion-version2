import { MatchResult } from "../../../results/_types/types";
import { calculateSectionHeights } from "../../../results/layout/MatchCard/_utils/calculations";

/**
 * Team score/name block height in full CNSW Results (40% of half the asset area).
 */
export const calculateCNSWLiteTeamsBlockHeight = (
  availableHeight: number,
): number => Math.floor((availableHeight / 2) * 0.4);

/** Abandoned status line above the teams block (no bar). */
export const CNSW_LITE_ABANDONED_BAR_HEIGHT_PX = 36;

export const calculateCNSWLiteRowHeight = (
  availableHeight: number,
  match: MatchResult,
  isAccountClub: boolean,
): number => {
  const teamsBlockHeight = calculateCNSWLiteTeamsBlockHeight(availableHeight);
  let height = teamsBlockHeight;

  if (isAccountClub && match.resultShort) {
    const syntheticRowHeight = Math.max(
      teamsBlockHeight,
      Math.floor(teamsBlockHeight / 0.4),
    );
    const { headerHeight } = calculateSectionHeights(syntheticRowHeight);
    height += headerHeight;
  }

  if (match.status === "Abandoned") {
    height += CNSW_LITE_ABANDONED_BAR_HEIGHT_PX;
  }

  return height;
};
