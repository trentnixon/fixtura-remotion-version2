import { TeamOfTheWeekPlayer } from "../../../types";

export interface TeamOfTheWeekCategoryGroups {
  batters: TeamOfTheWeekPlayer[];
  allRounders: TeamOfTheWeekPlayer[];
  bowlers: TeamOfTheWeekPlayer[];
  twelfthMan: TeamOfTheWeekPlayer[];
}

export const groupPlayersByCategory = (
  players: TeamOfTheWeekPlayer[],
): TeamOfTheWeekCategoryGroups => {
  const batters: TeamOfTheWeekPlayer[] = [];
  const allRounders: TeamOfTheWeekPlayer[] = [];
  const bowlers: TeamOfTheWeekPlayer[] = [];
  const twelfthMan: TeamOfTheWeekPlayer[] = [];

  for (const player of players) {
    switch (player.category) {
      case "Batter":
        batters.push(player);
        break;
      case "All-Rounder":
        allRounders.push(player);
        break;
      case "Bowler":
        bowlers.push(player);
        break;
      case "Twelfth Man":
        twelfthMan.push(player);
        break;
      default:
        break;
    }
  }

  return { batters, allRounders, bowlers, twelfthMan };
};
