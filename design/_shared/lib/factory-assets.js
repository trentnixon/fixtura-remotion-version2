/** Canonical cricket design-factory assets (URL slugs). */

export const CRICKET_FACTORY_ASSETS = [
  {
    slug: "results",
    label: "Results",
    fixture: "testData/samples/Cricket/Cricket_Results.json",
    composition: "cricket/results",
    themeFile: "results.ts",
    population: "results",
  },
  {
    slug: "result-single",
    label: "Result Single",
    fixture: "testData/samples/Cricket/Cricket_WeekendResultsSingle.json",
    composition: "cricket/resultSingle",
    themeFile: "resultSingle.ts",
    population: "result-single",
  },
  {
    slug: "upcoming",
    label: "Upcoming Fixtures",
    fixture: "testData/samples/Cricket/Cricket_upcoming.json",
    composition: "cricket/upcoming",
    themeFile: "upcoming.ts",
    population: "upcoming",
  },
  {
    slug: "ladder",
    label: "Ladder",
    fixture: "testData/samples/Cricket/Cricket_Ladder.json",
    composition: "cricket/ladder",
    themeFile: "ladder.ts",
    population: "ladder",
  },
  {
    slug: "top5-batting",
    label: "Top 5 Batting",
    fixture: "testData/samples/Cricket/Cricket_Top5Batters.json",
    composition: "cricket/top5",
    themeFile: "top5.ts",
    population: "top5-batting",
  },
  {
    slug: "top5-bowling",
    label: "Top 5 Bowling",
    fixture: "testData/samples/Cricket/Cricket_Top5Bowlers.json",
    composition: "cricket/top5",
    themeFile: "top5.ts",
    population: "top5-bowling",
  },
  {
    slug: "performances-batting",
    label: "Batting Performances",
    fixture: "testData/samples/Cricket/Cricket_BattingPerformances.json",
    composition: "cricket/performances",
    themeFile: "performances.ts",
    population: "performances-batting",
  },
  {
    slug: "performances-bowling",
    label: "Bowling Performances",
    fixture: "testData/samples/Cricket/Cricket_BowlingPerformances.json",
    composition: "cricket/performances",
    themeFile: "performances.ts",
    population: "performances-bowling",
  },
  {
    slug: "team-roster",
    label: "Team Roster",
    fixture: "testData/samples/Cricket/Cricket_Roster.json",
    composition: "cricket/teamRoster",
    themeFile: "roster.ts",
    population: "team-roster",
  },
  {
    slug: "team-of-the-week",
    label: "Team of the Week",
    fixture: "testData/samples/Cricket/Cricket_TeamOfTheWeek.json",
    composition: "cricket/teamOfTheWeek",
    themeFile: "teamOfTheWeek.ts",
    population: "team-of-the-week",
  },
];

/**
 * @param {string} registryId
 * @param {string} [variantFolderOverride]
 */
export function resolveVariantFolder(registryId, variantFolderOverride) {
  if (variantFolderOverride) {
    return variantFolderOverride;
  }
  if (!registryId || registryId.length === 0) {
    throw new Error("Registry ID is required");
  }
  return registryId.charAt(0).toLowerCase() + registryId.slice(1);
}

/**
 * @param {string} registryId
 */
export function routingKeyFromRegistryId(registryId) {
  return registryId.toLowerCase();
}
