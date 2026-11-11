import { logoHasCrest } from "./crest.js";

/**
 * @param {ParentNode} root
 */
export function syncScorelineLadderLayout(root = document) {
  const CREASE_MAX_ROWS = 12;
  const rowsContainer = root.querySelector(".ladder-rows");
  const visibleEntries = [...root.querySelectorAll(".ladder-entry")].filter(
    (entry) => entry instanceof HTMLElement && entry.dataset.empty !== "true",
  );
  const rowCount =
    visibleEntries.length || root.querySelectorAll(".ladder-entry").length;

  if (rowsContainer instanceof HTMLElement) {
    rowsContainer.dataset.density =
      rowCount <= 11 ? "normal" : rowCount <= 14 ? "compact" : "tight";
    const showCreases = rowCount <= CREASE_MAX_ROWS;
    rowsContainer.dataset.creases = showCreases ? "true" : "false";

    if (!showCreases) {
      rowsContainer.querySelectorAll(".ladder-crease").forEach((crease) => {
        crease.remove();
      });
    }
  }

  root.querySelectorAll(".ladder-entry").forEach((entry, index) => {
    if (!(entry instanceof HTMLElement)) {
      return;
    }

    const img = entry.querySelector(".ladder-mark img");
    const mark = entry.querySelector(".ladder-mark");
    const team = entry.querySelector(".ladder-team");

    if (mark instanceof HTMLElement) {
      mark.dataset.hasCrest = logoHasCrest(img) ? "true" : "false";
    }

    if (team?.textContent?.trim()) {
      entry.dataset.empty = "false";
    }

    if (index === 0 && entry.dataset.empty !== "true") {
      entry.dataset.rank = "1";
    } else {
      delete entry.dataset.rank;
    }
  });
}
