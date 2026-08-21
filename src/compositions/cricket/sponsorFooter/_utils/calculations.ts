import { Timings } from "../../../../core/types/data/common";

/** Frames before main end where footer exit starts. */
export const FOOTER_EXIT_OFFSET_FRAMES = 15;

/** Length of the footer logo exit animation. */
export const FOOTER_EXIT_ANIMATION_DURATION_FRAMES = 15;

/**
 * Local main-sequence frame where sponsor footer exit starts.
 * Returns 0 when FPS_MAIN is missing/invalid so AnimatedImage skips exit.
 */
export const calculateFooterExitFrame = (
  timings: Timings | undefined,
): number => {
  const mainDuration = timings?.FPS_MAIN;
  if (typeof mainDuration !== "number" || mainDuration <= 0) {
    return 0;
  }
  return Math.max(0, mainDuration - FOOTER_EXIT_OFFSET_FRAMES);
};
