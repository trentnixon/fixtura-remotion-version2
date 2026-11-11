import { syncScorelineMatchModule } from "./match-module.js";
import { syncScorelineOrganisationCrest } from "./crest.js";

/**
 * @param {ParentNode} root
 */
export function syncScorelineResultsLayout(root = document) {
  root
    .querySelectorAll(".results-ledger .match-module")
    .forEach((module, index) => {
      syncScorelineMatchModule(index + 1, module);
    });

  syncScorelineOrganisationCrest(root);
}
