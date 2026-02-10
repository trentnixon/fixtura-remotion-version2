import { RosterDataItem } from "../_types/types";
import { Timings } from "../../../../core/types/data/common";
import { DEFAULT_ROSTER_DURATION } from "./constants";

/**
 * Check if roster data is valid
 * @param rosterData - Data from video context
 * @returns True if data is valid and non-empty array
 */
export const hasValidRosterData = (rosterData: unknown): boolean => {
  return (
    rosterData !== null &&
    rosterData !== undefined &&
    Array.isArray(rosterData) &&
    rosterData.length > 0
  );
};

/**
 * Cast composition data to typed roster data array
 * @param compositionData - Data from video context
 * @returns Typed array of RosterDataItem
 */
export const castToRosterDataArray = (
  compositionData: unknown,
): RosterDataItem[] => {
  return compositionData as unknown as RosterDataItem[];
};

/**
 * Calculate duration in frames for roster sequence
 * @param timings - Video data timings object
 * @returns Duration in frames (FPS_SCORECARD or default)
 */
export const calculateRosterDuration = (
  timings: Timings | undefined,
): number => {
  return timings?.FPS_SCORECARD || DEFAULT_ROSTER_DURATION;
};
