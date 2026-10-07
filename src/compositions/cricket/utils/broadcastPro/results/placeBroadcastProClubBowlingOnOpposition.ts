import type { Team } from "../../../results/_types/types";

/**
 * Club batting stays with the club. Club bowling is shown under the opposition score.
 */
export const placeBroadcastProClubBowlingOnOpposition = (
  homeTeam: Team,
  awayTeam: Team,
  isAccountClub: boolean,
): { homeTeam: Team; awayTeam: Team } => {
  if (!isAccountClub) {
    return { homeTeam, awayTeam };
  }

  if (homeTeam.isClubTeam && !awayTeam.isClubTeam) {
    return {
      homeTeam,
      awayTeam: {
        ...awayTeam,
        bowlingPerformances: homeTeam.bowlingPerformances,
      },
    };
  }

  if (awayTeam.isClubTeam && !homeTeam.isClubTeam) {
    return {
      homeTeam: {
        ...homeTeam,
        bowlingPerformances: awayTeam.bowlingPerformances,
      },
      awayTeam,
    };
  }

  return { homeTeam, awayTeam };
};
