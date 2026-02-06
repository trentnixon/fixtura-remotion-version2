import { Timings } from "../../../../../../core/types/data/common";

/**
 * Calculate animation delay for a row based on its index
 * @param index - The row index
 * @param multiplier - Delay multiplier (default: 5)
 * @returns Animation delay in frames
 */
export const calculateAnimationDelay = (
  index: number,
  multiplier: number = 5,
): number => {
  return index * multiplier;
};

/**
 * Calculate the exit frame for animation based on timings
 * @param timings - Video data timings object
 * @returns Exit frame number
 */
export const calculateAnimationOutFrame = (
  timings: Timings | undefined,
): number => {
  return timings?.FPS_LADDER ? timings.FPS_LADDER - 20 : 0;
};

/**
 * Parse team position from string to number
 * @param position - Team position as string
 * @returns Parsed position as number
 */
export const parseTeamPosition = (position: string): number => {
  return parseInt(position);
};
