/**
 * Maps design-site `remotion.composition` paths to cricket `index.tsx` export names
 * (e.g. `CricketResults`), not metadata composition IDs (`CricketTop5Batting`).
 * Keep aligned with `design/_shared/routes.json`.
 */
export const COMPOSITION_ROUTE_TO_EXPORT_BLOCK: Record<string, string> = {
  "cricket/results": "CricketResults",
  "cricket/results-lite": "CricketResultsLite",
  "cricket/resultSingle": "CricketResultSingle",
  "cricket/result-single": "CricketResultSingle",
  "cricket/upcoming": "CricketUpcoming",
  "cricket/ladder": "CricketLadder",
  "cricket/top5": "CricketTop5",
  "cricket/performances": "CricketPerformances",
  "cricket/teamRoster": "CricketRoster",
  "cricket/team-roster": "CricketRoster",
  "cricket/teamOfTheWeek": "CricketTeamOfTheWeek",
  "cricket/team-of-the-week": "CricketTeamOfTheWeek",
};

export const compositionExportBlockNameFromRoute = (
  compositionRoute: string,
): string | undefined => COMPOSITION_ROUTE_TO_EXPORT_BLOCK[compositionRoute];
