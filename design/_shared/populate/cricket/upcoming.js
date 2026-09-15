import {
  syncUpcomingHeaderContext,
  syncScorelineUpcomingLayout,
} from "../../scoreline-layout.js";

/**
 * @param {import("./types.js").PopulationArgs} [args]
 */
export function populateUpcoming(args = {}) {
  const root = args.canvas ?? document;
  syncScorelineUpcomingLayout(root);
  if (args.fixture) {
    syncUpcomingHeaderContext(root, args.fixture);
  }
}
