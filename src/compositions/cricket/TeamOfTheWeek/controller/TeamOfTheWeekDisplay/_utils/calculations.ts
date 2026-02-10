import { PLAYER_STAGGER_DELAY } from "../../../types";

/**
 * Calculate animation delay for player rows based on index
 * Used by CNSW variants that require explicit delay prop
 * @param index - Player index in the array
 * @returns Calculated delay value
 */
export const calculatePlayerDelay = (index: number): number => {
  return index * PLAYER_STAGGER_DELAY;
};
