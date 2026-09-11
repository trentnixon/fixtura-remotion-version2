/** Mirrors design/_shared/scoreline-layout.js syncScorelineUpcomingLayout club focus. */
export const resolveScorelineUpcomingClubSides = (
  homeTeam: string,
  awayTeam: string,
  clubName: string | undefined,
): { homeIsClub: boolean; awayIsClub: boolean } => {
  const clubFocus = (clubName ?? "").replace(/\s+cricket club.*$/i, "").trim();

  const teamIsClub = (name: string): boolean => {
    const team = name.trim();
    if (!team || clubFocus.length <= 3) {
      return false;
    }

    return team.toLowerCase().includes(clubFocus.toLowerCase());
  };

  const homeIsClub = teamIsClub(homeTeam);
  const awayIsClub = teamIsClub(awayTeam);

  if (homeIsClub) {
    return { homeIsClub: true, awayIsClub: false };
  }

  if (awayIsClub) {
    return { homeIsClub: false, awayIsClub: true };
  }

  return { homeIsClub: false, awayIsClub: false };
};
