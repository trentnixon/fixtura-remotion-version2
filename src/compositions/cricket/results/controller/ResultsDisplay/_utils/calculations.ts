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

export const BROADCAST_PRO_RESULTS_GAP_PX = 24;

/**
 * Split main-content height across fixtures, with a little vertical breathing
 * room so cards are not forced full-bleed when copy is shorter than the slot.
 */
export const calculateBroadcastProResultsLayout = (
  availableHeight: number,
  resultCount: number,
): { listHeight: number; rowHeight: number } => {
  if (resultCount <= 0) return { listHeight: 0, rowHeight: 0 };

  const listHeight =
    resultCount === 1
      ? Math.min(availableHeight, Math.floor(availableHeight * 0.82))
      : Math.min(availableHeight, Math.floor(availableHeight * 0.9));
  const totalGap = BROADCAST_PRO_RESULTS_GAP_PX * (resultCount - 1);

  return {
    listHeight: Math.max(1, listHeight),
    rowHeight: Math.max(1, Math.floor((listHeight - totalGap) / resultCount)),
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
