/**
 * Format score with overs for display
 * Format: "{score} ({overs})"
 * Example: "240/8 (40)"
 */
export const formatScoreWithOvers = (
  score: string | null | undefined,
  overs: string | null | undefined,
): string => {
  const normalizedScore = (score || "").trim();
  const normalizedOvers = (overs || "").trim();

  if (!normalizedScore || normalizedScore.toUpperCase() === "N/A") {
    return "Yet to Bat";
  }

  if (normalizedOvers) {
    return `${normalizedScore} ${normalizedOvers}`;
  }

  return normalizedScore;
};

/**
 * Determine which team is the club team
 */
export const getClubTeam = (
  homeTeam: { isClubTeam: boolean },
  awayTeam: { isClubTeam: boolean },
): "home" | "away" => {
  if (homeTeam.isClubTeam) return "home";
  if (awayTeam.isClubTeam) return "away";
  // Fallback to home if neither is marked as club team
  return "home";
};
