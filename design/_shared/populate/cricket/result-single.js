import { syncScorelineResultsLayout } from "../../scoreline-layout.js";

/** @param {import("./types.js").PopulationArgs} _args */
export function populateResultSingle(_args) {
  syncScorelineResultsLayout(document);
}
