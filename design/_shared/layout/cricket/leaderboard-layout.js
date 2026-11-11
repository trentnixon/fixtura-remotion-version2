import { logoHasCrest } from "./crest.js";

const resolvePerformanceLeaderboardDensity = (rowCount) => {
  if (rowCount <= 5) {
    return undefined;
  }

  if (rowCount === 6) {
    return "compact";
  }

  return "tight";
};

/**
 * Night Session fixture density tier for performance leaderboards.
 *
 * @param {ParentNode} root
 */
export function syncNightSessionLeaderboardDensity(root = document) {
  const rowsContainer = root.querySelector(".leaderboard-rows");
  if (!(rowsContainer instanceof HTMLElement)) {
    return;
  }

  const visibleCount = [...root.querySelectorAll(".leader-entry")].filter(
    (entry) => entry instanceof HTMLElement && entry.dataset.empty !== "true",
  ).length;

  const density = resolvePerformanceLeaderboardDensity(visibleCount);
  if (density) {
    rowsContainer.dataset.density = density;
  } else {
    delete rowsContainer.dataset.density;
  }
}

/**
 * @param {ParentNode} root
 */
export function syncScorelineLeaderboardLayout(root = document) {
  root.querySelectorAll(".leader-entry").forEach((entry, index) => {
    if (!(entry instanceof HTMLElement)) {
      return;
    }

    const img = entry.querySelector(".leader-mark img");
    const mark = entry.querySelector(".leader-mark");
    const name = entry.querySelector(".leader-name");

    if (mark instanceof HTMLElement) {
      mark.dataset.hasCrest = logoHasCrest(img) ? "true" : "false";
    }

    entry.dataset.empty = name?.textContent?.trim() ? "false" : "true";

    if (index === 0 && name?.textContent?.trim()) {
      entry.dataset.rank = "1";
    } else {
      delete entry.dataset.rank;
    }
  });
}
