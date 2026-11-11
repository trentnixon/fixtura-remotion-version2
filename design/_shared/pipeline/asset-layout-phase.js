import { watchScorelineCrests } from "../layout/cricket/crest-watch.js";
import { syncScorelineOrganisationCrest } from "../layout/cricket/crest.js";
import { syncScorelineUpcomingLayout } from "../layout/cricket/upcoming-layout.js";
import { syncScorelineRosterLayout } from "../layout/cricket/roster-layout.js";
import { syncScorelineLeaderboardLayout } from "../layout/cricket/leaderboard-layout.js";
import { syncScorelineLadderLayout } from "../layout/cricket/ladder-layout.js";
import { syncScorelineTotwLayout } from "../layout/cricket/totw-layout.js";
import { syncNightSessionLeaderboardDensity } from "../layout/cricket/leaderboard-layout.js";
import { syncScorelineResultsLayout } from "../layout/cricket/results-layout.js";

/**
 * Default post-population layout pass shared by Scoreline and Night Session.
 *
 * @param {ParentNode} root
 * @param {{
 *   resultsLayout?: boolean;
 *   nightSessionDensity?: boolean;
 * }} [options]
 */
export function runCricketAssetLayoutPhase(root = document, options = {}) {
  const { resultsLayout = false, nightSessionDensity = false } = options;

  watchScorelineCrests(root);
  syncScorelineOrganisationCrest(root);
  syncScorelineUpcomingLayout(root);
  syncScorelineRosterLayout(root);
  syncScorelineLeaderboardLayout(root);
  if (nightSessionDensity) {
    syncNightSessionLeaderboardDensity(root);
  }
  syncScorelineLadderLayout(root);
  syncScorelineTotwLayout(root);

  syncScorelineRosterLayout(root);
  syncScorelineTotwLayout(root);

  if (resultsLayout) {
    syncScorelineResultsLayout(root);
  }
}
