import { PlayerData, isBatter, isBowler } from "../../_types/types";

/**
 * Score display values for a player
 */
export interface ScoreValues {
  mainValue: string;
  suffix: string;
}

/**
 * Get the appropriate score display values based on player type
 * @param player - PlayerData object (batter or bowler)
 * @returns Object containing mainValue and suffix for score display
 */
export const getScoreValues = (player: PlayerData): ScoreValues => {
  if (isBatter(player)) {
    // Main value is runs (with * for not out), suffix is only balls faced
    const mainValue = player.notOut ? `${player.runs}*` : `${player.runs}`;
    const suffix = player.balls > 0 ? `(${player.balls})` : "";
    return { mainValue, suffix };
  } else if (isBowler(player)) {
    // Main value is wickets-runs, suffix is overs
    const mainValue = `${player.wickets}/${player.runs}`;
    const suffix = `(${player.overs})`;
    return { mainValue, suffix };
  }

  // Fallback
  return { mainValue: "--", suffix: "" };
};
