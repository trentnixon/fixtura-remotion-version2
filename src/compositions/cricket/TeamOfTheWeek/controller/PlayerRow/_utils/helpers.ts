import { TeamOfTheWeekPlayer } from "../../../types";

/**
 * Check if player position is an all-rounder position
 * @param position - Player category position
 * @returns True if position is topallrounder or bestoftherest
 */
export const isAllRounderPosition = (
  position: string,
): boolean => {
  return (
    position === "topallrounder" || position === "bestoftherest"
  );
};

/**
 * Check if player has both batting and bowling stats
 * @param player - TeamOfTheWeekPlayer object
 * @returns True if both batting and bowling stats exist
 */
export const hasBothStats = (
  player: TeamOfTheWeekPlayer,
): boolean => {
  return !!(player.batting && player.bowling);
};
