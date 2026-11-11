import type { Timings } from "../types/data/common";

/**
 * Main-sequence exit timing policy (see docs/adr/0001-sponsor-footer-exit-timing.md).
 *
 * - **Footer** — `FPS_MAIN − 15`; 15-frame logo out (sponsor strip). Not aligned with headers/rows.
 * - **Main header** — `FPS_MAIN − 30`; title/logo out on template main headers.
 * - **Main row** — `(FPS_MAIN ?? 30) − 30`; list/leader rows (Top 5, performances, etc.).
 */
export {
  FOOTER_EXIT_ANIMATION_DURATION_FRAMES,
  FOOTER_EXIT_OFFSET_FRAMES,
  calculateFooterExitFrame,
} from "./sponsorFooterExitPolicy";

export const MAIN_HEADER_EXIT_OFFSET_FRAMES = 30;
export const MAIN_ROW_EXIT_OFFSET_FRAMES = 30;
/** Fallback when `FPS_MAIN` is missing on row-driven assets (historical Top 5 default). */
export const MAIN_ROW_DURATION_FALLBACK_FRAMES = 30;

/** Local main frame where animated main headers begin exit; 0 skips exit when `FPS_MAIN` is invalid. */
export const calculateMainHeaderExitFrame = (
  timings: Timings | undefined,
): number => {
  const mainDuration = timings?.FPS_MAIN;
  if (typeof mainDuration !== "number" || mainDuration <= 0) {
    return 0;
  }
  return Math.max(0, mainDuration - MAIN_HEADER_EXIT_OFFSET_FRAMES);
};

/** Local main frame where row/shell content begins exit (Top 5, Scoreline lists, etc.). */
export const calculateMainRowExitFrame = (
  timings: Timings | undefined,
): number =>
  (timings?.FPS_MAIN || MAIN_ROW_DURATION_FALLBACK_FRAMES) -
  MAIN_ROW_EXIT_OFFSET_FRAMES;
