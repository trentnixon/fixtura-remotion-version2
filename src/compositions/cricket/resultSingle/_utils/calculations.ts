import { MatchResult } from "../types";

/**
 * Default frame duration if not specified
 */
export const DEFAULT_DISPLAY_DURATION = 300;

/**
 * Calculates the display duration per match based on timings or video metadata
 * @param timings - Timing configuration object
 * @param frameOptions - Array of frame options from video metadata
 * @returns Display duration in frames
 */
export const calculateDisplayDurationPerMatch = (
  timings?: { FPS_SCORECARD?: number },
  frameOptions?: number[],
): number => {
  return (
    timings?.FPS_SCORECARD || frameOptions?.[0] || DEFAULT_DISPLAY_DURATION
  );
};

/**
 * Validates and casts results data to MatchResult array
 * @param resultsData - Raw results data from context
 * @returns Typed MatchResult array
 */
export const castToMatchResults = (resultsData: unknown): MatchResult[] => {
  return (resultsData as MatchResult[]) || [];
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
