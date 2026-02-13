/**
 * Format score with overs for display (Mudgeeraba style)
 * Format: "{score} ({overs})" or "Yet to Bat"
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
