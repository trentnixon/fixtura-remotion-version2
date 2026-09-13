import { syncScorelineLeaderboardLayout } from "../../scoreline-layout.js";

/** @param {import("./types.js").PopulationArgs} _args */
export function populateTop5Batting(_args) {
  syncScorelineLeaderboardLayout(document);
}
