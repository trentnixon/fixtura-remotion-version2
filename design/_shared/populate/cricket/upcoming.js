import { syncScorelineUpcomingLayout } from "../../scoreline-layout.js";

/** @param {import("./types.js").PopulationArgs} _args */
export function populateUpcoming(_args) {
  syncScorelineUpcomingLayout(document);
}
