import { LadderData } from "../types";
import { Timings } from "../../../../core/types/data/common";

/**
 * Default duration in frames if FPS_LADDER is not specified
 */
export const DEFAULT_LADDER_DURATION = 300;

/**
 * Check if ladder data is valid
 * @param compositionData - The composition data to validate
 * @returns True if data is valid, false otherwise
 */
export const hasValidLadderData = (compositionData: unknown): boolean => {
  return (
    compositionData !== null &&
    compositionData !== undefined &&
    Array.isArray(compositionData) &&
    compositionData.length > 0
  );
};

/**
 * Cast composition data to LadderData array
 * @param compositionData - The composition data to cast
 * @returns Casted LadderData array
 */
export const castToLadderDataArray = (
  compositionData: unknown,
): LadderData[] => {
  return compositionData as unknown as LadderData[];
};

/**
 * Calculate duration in frames for ladder sequences
 * @param timings - Video data timings object
 * @returns Duration in frames (FPS_LADDER or default)
 */
export const calculateLadderDuration = (
  timings: Timings | undefined,
): number => {
  return timings?.FPS_LADDER || DEFAULT_LADDER_DURATION;
};
