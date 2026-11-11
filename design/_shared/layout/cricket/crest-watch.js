import { syncScorelineOrganisationCrest } from "./crest.js";
import { syncScorelineResultsLayout } from "./results-layout.js";
import { syncScorelineUpcomingLayout } from "./upcoming-layout.js";
import { syncScorelineRosterLayout } from "./roster-layout.js";
import { syncScorelineLeaderboardLayout } from "./leaderboard-layout.js";
import { syncScorelineLadderLayout } from "./ladder-layout.js";
import { syncScorelineTotwLayout } from "./totw-layout.js";

/**
 * Re-sync when crest images finish loading or fail.
 *
 * @param {ParentNode} root
 */
export function watchScorelineCrests(root = document) {
  root
    .querySelectorAll(".team-mark img, .organisation-mark img")
    .forEach((img) => {
      if (!(img instanceof HTMLImageElement)) {
        return;
      }

      const resync = () => {
        syncScorelineOrganisationCrest(root);
        syncScorelineResultsLayout(root);
        syncScorelineUpcomingLayout(root);
        syncScorelineRosterLayout(root);
        syncScorelineLeaderboardLayout(root);
        syncScorelineLadderLayout(root);
        syncScorelineTotwLayout(root);
      };
      img.addEventListener("load", resync);
      img.addEventListener("error", resync);
    });

  root
    .querySelectorAll(".ladder-mark img, .leader-mark img, .totw-mark img")
    .forEach((img) => {
      if (!(img instanceof HTMLImageElement)) {
        return;
      }

      const resync = () => {
        syncScorelineLeaderboardLayout(root);
        syncScorelineLadderLayout(root);
        syncScorelineTotwLayout(root);
      };
      img.addEventListener("load", resync);
      img.addEventListener("error", resync);
    });
}
