import { syncScorelineLadderLayout } from "../../scoreline-layout.js";

/** @param {import("./types.js").PopulationArgs} _args */
export function populateLadder(_args) {
  syncScorelineLadderLayout(document);
}
