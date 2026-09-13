import { syncScorelineResultsLayout } from "../../scoreline-layout.js";

/** @param {import("./types.js").PopulationArgs} _args */
export function populateResults(_args) {
  syncScorelineResultsLayout(document);
}
