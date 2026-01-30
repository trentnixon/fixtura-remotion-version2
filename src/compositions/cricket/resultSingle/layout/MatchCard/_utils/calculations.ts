import {
  MatchResult,
  BattingPerformance,
  BowlingPerformance,
} from "../../../types";

/**
 * Calculates section heights based on row height
 * @param rowHeight - Total height of the row
 * @returns Object containing teamsHeight, statsHeight, and headerHeight
 */
export const calculateSectionHeights = (rowHeight: number) => {
  const teamsHeight = Math.floor(rowHeight * 0.4); // 40% for team scores
  const statsHeight = Math.floor(rowHeight * 0.5); // 50% for player stats
  const headerHeight = Math.floor(rowHeight * 0.1); // 10% for match info

  return {
    teamsHeight,
    statsHeight,
    headerHeight,
  };
};

/**
 * Calculates animation delays based on base delay
 * @param delay - Base delay value
 * @returns Object containing baseDelay, statsDelay, and headerDelay
 */
export const calculateDelays = (delay: number) => {
  const baseDelay = delay;
  const statsDelay = baseDelay + 4;
  const headerDelay = statsDelay + 5;

  return {
    baseDelay,
    statsDelay,
    headerDelay,
  };
};

/**
 * Determines which team is the club team and returns only their players
 * @param match - MatchResult object containing homeTeam and awayTeam
 * @returns Object containing the club team's batting and bowling performances, or null if no club team found
 */
export const getClubTeamPlayers = (
  match: MatchResult,
): {
  battingPerformances: BattingPerformance[];
  bowlingPerformances: BowlingPerformance[];
} | null => {
  const clubTeam = match.homeTeam.isClubTeam
    ? match.homeTeam
    : match.awayTeam.isClubTeam
      ? match.awayTeam
      : null;

  if (!clubTeam) {
    return null;
  }

  return {
    battingPerformances: clubTeam.battingPerformances,
    bowlingPerformances: clubTeam.bowlingPerformances,
  };
};
