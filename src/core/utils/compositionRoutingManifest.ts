/**
 * Maps design-site `remotion.composition` paths to runtime composition metadata IDs.
 * Keep aligned with `design/_shared/routes.json` asset entries.
 */
export const REMOTION_COMPOSITION_PATH_TO_ID: Record<string, string> = {
  "cricket/ladder": "CricketLadder",
  "cricket/results": "CricketResults",
  "cricket/results-lite": "CricketResultsLite",
  "cricket/upcoming": "CricketUpcoming",
  "cricket/result-single": "CricketResultSingle",
  "cricket/resultSingle": "CricketResultSingle",
  "cricket/top5": "CricketTop5Batting",
  "cricket/performances": "CricketBattingPerformances",
  "cricket/team-roster": "CricketRoster",
  "cricket/teamRoster": "CricketRoster",
  "cricket/team-of-the-week": "CricketTeamOfTheWeek",
  "cricket/teamOfTheWeek": "CricketTeamOfTheWeek",
};

/**
 * @param {string} remotionComposition e.g. `cricket/results`
 */
export function metadataCompositionIdFromRemotionPath(
  remotionComposition: string,
  assetSlug?: string,
): string {
  if (assetSlug === "top5-bowling") {
    return "CricketTop5Bowling";
  }
  if (assetSlug === "performances-bowling") {
    return "CricketBowlingPerformances";
  }
  if (assetSlug === "performances-batting") {
    return "CricketBattingPerformances";
  }
  if (assetSlug === "top5-batting") {
    return "CricketTop5Batting";
  }

  const mapped = REMOTION_COMPOSITION_PATH_TO_ID[remotionComposition];
  if (!mapped) {
    throw new Error(`Unknown remotion composition path: ${remotionComposition}`);
  }
  return mapped;
}
