import {
  syncResultsHeaderContext,
  syncScorelineResultsLayout,
} from "../../scoreline-layout.js";

/**
 * @param {import("./types.js").PopulationArgs} [args]
 */
export function populateResults(args = {}) {
  const root = args.canvas ?? document;
  syncScorelineResultsLayout(root);
  if (args.fixture) {
    syncResultsHeaderContext(root, args.fixture);
    syncResultsSponsorState(root, args.fixture);
  }
}

/**
 * @param {ParentNode} root
 * @param {unknown} fixture
 */
function syncResultsSponsorState(root, fixture) {
  const canvas = root.querySelector?.(".template-canvas") ?? root;
  if (!(canvas instanceof HTMLElement)) {
    return;
  }

  const include = fixture?.videoMeta?.video?.metadata?.includeSponsors === true;
  const count = Number(fixture?.videoMeta?.club?.sponsors?.sponsorNum ?? 0);
  canvas.dataset.sponsorState = include && count > 0 ? "present" : "absent";
}
