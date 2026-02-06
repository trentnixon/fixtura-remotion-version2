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
 * Calculate animation delay with modulo pattern (for CNSW variant)
 * @param index - The row index
 * @param modulo - Modulo value (default: 7)
 * @param multiplier - Delay multiplier (default: 2.5)
 * @returns Animation delay in frames
 */
export const calculateAnimationDelayModulo = (
  index: number,
  modulo: number = 7,
  multiplier: number = 2.5,
): number => {
  return (index % modulo) * multiplier;
};

/**
 * Calculate the exit frame for animation based on timings
 * @param timings - Video data timings object
 * @returns Exit frame number
 */
export const calculateAnimationOutFrame = (
  timings: Timings | undefined,
): number => {
  return (timings?.FPS_PREFORMANCECARD || 180) - 30;
};
