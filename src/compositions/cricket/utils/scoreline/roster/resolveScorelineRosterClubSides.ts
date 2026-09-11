/** Mirrors design/_shared/scoreline-layout.js syncScorelineRosterLayout club flags. */
export const resolveScorelineRosterClubSides = (
  isHomeTeam: boolean,
): { homeIsClub: boolean; awayIsClub: boolean } => ({
  homeIsClub: isHomeTeam,
  awayIsClub: !isHomeTeam,
});
