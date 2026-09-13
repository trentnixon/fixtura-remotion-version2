import { syncScorelineLeaderboardLayout } from "../../scoreline-layout.js";

/** @param {import("./types.js").PopulationArgs} _args */
export function populatePerformancesBatting(_args) {
  syncScorelineLeaderboardLayout(document);
}
