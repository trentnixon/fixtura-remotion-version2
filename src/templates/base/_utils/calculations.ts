import { Timings } from "../../../core/types/data/common";
import { SponsorsData } from "../../../core/types/data/sponsors";
import { calculateOutroDurationFromSponsors } from "../../../core/utils/sponsors";
import { DEFAULT_SEQUENCE_DURATION } from "./constants";

/**
 * Calculate intro duration in frames
 * @param timings - Video data timings object
 * @returns Duration in frames (FPS_INTRO or default)
 */
export const calculateIntroDuration = (
  timings: Timings | undefined,
): number => {
  return timings?.FPS_INTRO ?? DEFAULT_SEQUENCE_DURATION;
};

/**
 * Calculate main duration in frames
 * @param timings - Video data timings object
 * @returns Duration in frames (FPS_MAIN or default)
 */
export const calculateMainDuration = (timings: Timings | undefined): number => {
  return timings?.FPS_MAIN ?? DEFAULT_SEQUENCE_DURATION;
};

/**
 * Calculate outro duration in frames from sponsor pages (15 + 90 + 15 each).
 * Returns 0 when the account has no sponsors (no outro).
 */
export const calculateOutroDuration = (
  _timings: Timings | undefined,
  doesAccountHaveSponsors: boolean,
  sponsors?: SponsorsData | null,
): number => {
  return calculateOutroDurationFromSponsors(sponsors, doesAccountHaveSponsors);
};
