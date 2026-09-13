import { syncScorelineLeaderboardLayout } from "../../scoreline-layout.js";

/** @param {import("./types.js").PopulationArgs} _args */
export function populateTop5Bowling(_args) {
  syncScorelineLeaderboardLayout(document);
}
