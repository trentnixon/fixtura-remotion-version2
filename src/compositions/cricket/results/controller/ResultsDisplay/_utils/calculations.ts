import { MatchResult } from "../../../_types/types";
import { buildMultiRowFooterSponsors } from "../../../../../../core/utils/sponsors";
import type { Sponsor } from "../../../../../../core/types/data/sponsors";

/**
 * Calculates which results to display on the current screen
 * @param results - All available results
 * @param resultsPerScreen - Number of results to show per screen
 * @param screenIndex - Current screen index
 * @returns Object containing startIndex, endIndex, and displayedResults array
 */
export const calculateDisplayedResults = (
  results: MatchResult[],
  resultsPerScreen: number,
  screenIndex: number,
): {
  startIndex: number;
  endIndex: number;
  displayedResults: MatchResult[];
} => {
  const startIndex = screenIndex * resultsPerScreen;
  const endIndex = Math.min(startIndex + resultsPerScreen, results.length);
  const displayedResults = results.slice(startIndex, endIndex);

  return {
    startIndex,
    endIndex,
    displayedResults,
  };
};

/**
 * Calculates row height based on available height
 * Divides available height by 2 to get height for each row
 * @param availableHeight - Total available height
 * @returns Row height in pixels
 */
export const calculateRowHeight = (availableHeight: number): number => {
  return Math.floor(availableHeight / 2);
};

export const BROADCAST_PRO_RESULTS_GAP_PX = 30;

export const calculateBroadcastProResultsLayout = (
  availableHeight: number,
  resultCount: number,
): { listHeight: number; rowHeight: number } => {
  if (resultCount <= 0) return { listHeight: 0, rowHeight: 0 };

  const listHeight =
    resultCount === 1
      ? Math.min(availableHeight, 620)
      : Math.min(availableHeight, 850);
  const totalGap = BROADCAST_PRO_RESULTS_GAP_PX * (resultCount - 1);

  return {
    listHeight,
    rowHeight: Math.floor((listHeight - totalGap) / resultCount),
  };
};

/**
 * Build footer logos for the results currently on screen (multi-row v2 policy).
 */
export const buildResultsFooterSponsors = (
  displayedResults: MatchResult[],
): Sponsor[] => {
  return buildMultiRowFooterSponsors(displayedResults);
};
