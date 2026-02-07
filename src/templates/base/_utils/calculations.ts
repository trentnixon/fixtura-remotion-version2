import { Timings } from "../../../core/types/data/common";
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
export const calculateMainDuration = (
  timings: Timings | undefined,
): number => {
  return timings?.FPS_MAIN ?? DEFAULT_SEQUENCE_DURATION;
};

/**
 * Calculate outro duration in frames
 * @param timings - Video data timings object
 * @param doesAccountHaveSponsors - Whether the account has sponsors
 * @returns Duration in frames (FPS_OUTRO or default, or 30 if no sponsors)
 */
export const calculateOutroDuration = (
  timings: Timings | undefined,
  doesAccountHaveSponsors: boolean,
): number => {
  if (!doesAccountHaveSponsors) {
    return DEFAULT_SEQUENCE_DURATION;
  }
  return timings?.FPS_OUTRO ?? DEFAULT_SEQUENCE_DURATION;
};
