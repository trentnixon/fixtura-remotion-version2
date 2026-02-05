/**
 * Default delay multiplier for animation stagger
 */
export const DEFAULT_DELAY_MULTIPLIER = 15;

/**
 * Default delay multiplier for faster animation stagger (used by basic/brickWork variants)
 */
export const FAST_DELAY_MULTIPLIER = 5;

/**
 * Default FPS_SCORECARD value if not provided in timings
 */
export const DEFAULT_FPS_SCORECARD = 270;

/**
 * Offset to subtract from FPS_SCORECARD for exit frame calculation
 */
export const EXIT_FRAME_OFFSET = 20;

/**
 * Calculates animation delay based on card index
 * @param index - Card index (0-based)
 * @param multiplier - Delay multiplier (default: 15)
 * @returns Animation delay in frames
 */
export const calculateAnimationDelay = (
  index: number,
  multiplier: number = DEFAULT_DELAY_MULTIPLIER,
): number => {
  return index * multiplier;
};

/**
 * Calculates the exit frame for animations based on timings
 * @param timings - Timing configuration object
 * @returns Exit frame number
 */
export const calculateAnimationOutFrame = (timings?: {
  FPS_SCORECARD?: number;
}): number => {
  return (timings?.FPS_SCORECARD || DEFAULT_FPS_SCORECARD) - EXIT_FRAME_OFFSET;
};
