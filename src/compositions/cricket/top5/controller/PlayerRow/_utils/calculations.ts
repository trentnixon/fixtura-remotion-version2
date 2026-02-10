import { Timings } from "../../../../../../core/types/data/common";
import {
  STAGGER_DELAY_MULTIPLIER,
  DEFAULT_MAIN_DURATION,
  EXIT_ANIMATION_OFFSET,
} from "./constants";

/**
 * Calculate animation delay for player rows based on index
 * @param index - Player index in the array
 * @returns Calculated delay value
 */
export const calculatePlayerDelay = (index: number): number => {
  return index * STAGGER_DELAY_MULTIPLIER;
};

/**
 * Calculate exit frame for container animations
 * @param timings - Video data timings object
 * @returns Exit frame value (FPS_MAIN - offset or default - offset)
 */
export const calculateExitFrame = (
  timings: Timings | undefined,
): number => {
  return (timings?.FPS_MAIN || DEFAULT_MAIN_DURATION) - EXIT_ANIMATION_OFFSET;
};
