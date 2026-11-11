import { calculateMainRowExitFrame } from "../../../../../../core/timing/mainSequenceExitPolicy";
import { STAGGER_DELAY_MULTIPLIER } from "./constants";

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
/** @see mainSequenceExitPolicy — main row exit framing */
export const calculateExitFrame = calculateMainRowExitFrame;
