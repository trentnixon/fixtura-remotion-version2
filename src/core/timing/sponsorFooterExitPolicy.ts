import type { Timings } from "../types/data/common";

/**
 * Sponsor footer exit timing (docs/adr/0001-sponsor-footer-exit-timing.md).
 */
export const FOOTER_EXIT_OFFSET_FRAMES = 15;

export const FOOTER_EXIT_ANIMATION_DURATION_FRAMES = 15;

/** Local main-sequence frame where sponsor footer exit starts; 0 skips exit when FPS_MAIN is invalid. */
export const calculateFooterExitFrame = (
  timings: Timings | undefined,
): number => {
  const mainDuration = timings?.FPS_MAIN;
  if (typeof mainDuration !== "number" || mainDuration <= 0) {
    return 0;
  }
  return Math.max(0, mainDuration - FOOTER_EXIT_OFFSET_FRAMES);
};
