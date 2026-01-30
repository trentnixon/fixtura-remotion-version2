import { MatchResult } from "../../../_types/types";
import { AssignSponsors } from "../../../../composition-types";

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

/**
 * Merges all assignSponsors objects from displayed results into one object
 * @param displayedResults - Array of match results to merge sponsors from
 * @returns Merged AssignSponsors object
 */
export const mergeAssignSponsors = (
  displayedResults: MatchResult[],
): AssignSponsors => {
  return displayedResults.reduce(
    (acc, result) => ({ ...acc, ...result.assignSponsors }),
    {},
  ) as AssignSponsors;
};
