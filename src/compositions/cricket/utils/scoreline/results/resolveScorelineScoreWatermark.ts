/** Mirrors design/_shared/scoreline-layout.js runsFromScore + syncScoreWatermark. */
export const runsFromScore = (score: string | undefined): string => {
  const value = String(score ?? "").trim();
  const slashPart = value.split("/")[1];

  if (slashPart) {
    return slashPart.replace(/\D.*$/, "").trim();
  }

  return value.match(/\d+/)?.[0] ?? "";
};

export const resolveScorelineScoreWatermark = (
  homeScore: string | undefined,
  awayScore: string | undefined,
): string | null => {
  const homeRuns = Number(runsFromScore(homeScore)) || 0;
  const awayRuns = Number(runsFromScore(awayScore)) || 0;
  const watermarkScore =
    awayRuns > homeRuns ? runsFromScore(awayScore) : runsFromScore(homeScore);

  return watermarkScore || null;
};
