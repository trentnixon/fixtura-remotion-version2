/** Mirrors design/variants/scoreline/cricket/ladder.html afterHydrate bias logic. */
export const resolveScorelineLadderBiasTeam = (
  teamName: string,
  bias: string | null | undefined,
  clubName: string | undefined,
): boolean => {
  const team = teamName.trim();
  const biasValue = bias?.trim();

  if (biasValue) {
    return team === biasValue;
  }

  const clubFocus = (clubName ?? "").replace(/\s+cricket club.*$/i, "").trim();

  if (clubFocus.length <= 3 || !team) {
    return false;
  }

  return team.includes(clubFocus);
};
