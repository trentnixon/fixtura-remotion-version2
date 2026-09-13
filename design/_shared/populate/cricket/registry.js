import { populateResults } from "./results.js";
import { populateResultSingle } from "./result-single.js";
import { populateUpcoming } from "./upcoming.js";
import { populateLadder } from "./ladder.js";
import { populateTop5Batting } from "./top5-batting.js";
import { populateTop5Bowling } from "./top5-bowling.js";
import { populatePerformancesBatting } from "./performances-batting.js";
import { populatePerformancesBowling } from "./performances-bowling.js";
import { populateTeamRoster } from "./team-roster.js";
import { populateTeamOfTheWeek } from "./team-of-the-week.js";

/** @type {Record<string, (args: import("./types.js").PopulationArgs) => void | Promise<void>>} */
const MODULES = {
  results: populateResults,
  "result-single": populateResultSingle,
  upcoming: populateUpcoming,
  ladder: populateLadder,
  "top5-batting": populateTop5Batting,
  "top5-bowling": populateTop5Bowling,
  "performances-batting": populatePerformancesBatting,
  "performances-bowling": populatePerformancesBowling,
  "team-roster": populateTeamRoster,
  "team-of-the-week": populateTeamOfTheWeek,
};

/**
 * @param {{
 *   populationId: string | null;
 *   populationOverride: string | null;
 *   canvas: HTMLElement;
 *   fixture: unknown;
 *   context: { variantSlug: string; sportSlug: string; assetSlug: string };
 * }} params
 */
export async function runPopulationModule(params) {
  const { populationId, populationOverride, canvas, fixture, context } = params;

  if (populationOverride) {
    const mod = await import(/* @vite-ignore */ populationOverride);
    const fn = mod.default ?? mod.populate;
    if (typeof fn !== "function") {
      throw new Error(
        `Population override has no default export: ${populationOverride}`,
      );
    }
    await fn({ canvas, fixture, context });
    return;
  }

  if (!populationId) {
    return;
  }

  const fn = MODULES[populationId];
  if (!fn) {
    throw new Error(`Unknown population module: ${populationId}`);
  }

  await fn({ canvas, fixture, context });
}
