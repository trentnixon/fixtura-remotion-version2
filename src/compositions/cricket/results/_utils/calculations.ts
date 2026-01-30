import { MatchResult } from "../_types/types";

/**
 * Default number of results to display per screen
 */
export const DEFAULT_RESULTS_PER_SCREEN = 2;

/**
 * Default frame duration if not specified
 */
export const DEFAULT_DISPLAY_DURATION = 300;

/**
 * Calculates the display duration per screen based on timings or video metadata
 * @param timings - Timing configuration object
 * @param frameOptions - Array of frame options from video metadata
 * @returns Display duration in frames
 */
export const calculateDisplayDurationPerScreen = (
  timings?: { FPS_SCORECARD?: number },
  frameOptions?: number[],
): number => {
  return (
    timings?.FPS_SCORECARD || frameOptions?.[0] || DEFAULT_DISPLAY_DURATION
  );
};

/**
 * Calculates the total number of screens needed based on results count and results per screen
 * @param resultsCount - Total number of results
 * @param resultsPerScreen - Number of results to show per screen
 * @returns Total number of screens needed
 */
export const calculateTotalScreens = (
  resultsCount: number,
  resultsPerScreen: number = DEFAULT_RESULTS_PER_SCREEN,
): number => {
  return Math.ceil(resultsCount / resultsPerScreen);
};

/**
 * Validates and casts results data to MatchResult array
 * @param resultsData - Raw results data from context
 * @returns Typed MatchResult array
 */
export const castToMatchResults = (resultsData: unknown): MatchResult[] => {
  return (resultsData as unknown as MatchResult[]) || [];
};

/**
 * Checks if results data is valid and non-empty
 * @param resultsData - Results data to validate
 * @returns True if data is valid and has results
 */
export const hasValidResults = (resultsData: unknown): boolean => {
  return (
    resultsData !== null &&
    resultsData !== undefined &&
    Array.isArray(resultsData) &&
    resultsData.length > 0
  );
};
