import {
  syncResultsHeaderContext,
  syncScorelineResultsLayout,
} from "../../scoreline-layout.js";

/**
 * @param {import("./types.js").PopulationArgs} [args]
 */
export function populateResultSingle(args = {}) {
  const root = args.canvas ?? document;
  syncScorelineResultsLayout(root);

  const gradeRail = root.querySelector(
    ".match-module--single .fixture-unit__rail",
  );
  const gradeName = root.querySelector('[data-hydrate="grade-name"]');
  if (gradeRail instanceof HTMLElement) {
    const text = gradeName?.textContent?.trim() ?? "";
    gradeRail.dataset.empty = text ? "false" : "true";
  }

  if (args.fixture) {
    syncResultsHeaderContext(root, args.fixture);
    syncResultSingleSponsorState(root, args.fixture);
  }
}

/**
 * @param {ParentNode} root
 * @param {unknown} fixture
 */
function syncResultSingleSponsorState(root, fixture) {
  const canvas = root.querySelector?.(".template-canvas") ?? root;
  if (!(canvas instanceof HTMLElement)) {
    return;
  }

  const include =
    fixture?.videoMeta?.video?.metadata?.includeSponsors === true;
  const count = Number(fixture?.videoMeta?.club?.sponsors?.sponsorNum ?? 0);
  const hasSponsors = include && count > 0;
  canvas.dataset.sponsorState = hasSponsors ? "live" : "hidden";
}
