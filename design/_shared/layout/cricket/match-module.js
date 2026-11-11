import { dedupeVenueLabel } from "./venue.js";
import { logoHasCrest } from "./crest.js";

const countPerformanceRows = (matchNumber, discipline) => {
  let count = 0;

  for (let index = 1; index <= 3; index += 1) {
    const player = document.querySelector(
      `[data-hydrate="match-${matchNumber}-${discipline}-${index}"]`,
    );
    if (player?.textContent?.trim()) {
      count += 1;
    }
  }

  return count;
};

const syncOversVisibility = (module, matchNumber) => {
  for (const side of ["home", "away"]) {
    const oversValue = module.querySelector(
      `[data-hydrate="match-${matchNumber}-${side}-overs"]`,
    );
    const oversLine = oversValue?.closest(".overs");

    if (!(oversLine instanceof HTMLElement)) {
      continue;
    }

    const raw = oversValue?.textContent?.trim() ?? "";
    oversLine.dataset.empty = !raw || raw === "0" ? "true" : "false";
  }
};

const syncPerformanceRows = (module) => {
  module.querySelectorAll(".performance-panel").forEach((panel) => {
    let rank = 0;

    panel.querySelectorAll(".performance-row").forEach((row) => {
      if (!(row instanceof HTMLElement)) {
        return;
      }

      const player = row.querySelector(".performance-player");
      const filled = Boolean(player?.textContent?.trim());
      row.dataset.empty = filled ? "false" : "true";

      if (filled) {
        rank += 1;
        row.dataset.rank = String(rank);
      } else {
        delete row.dataset.rank;
      }
    });
  });
};

const syncCrestStates = (module, matchNumber) => {
  for (const side of ["home", "away"]) {
    const img = module.querySelector(
      `[data-hydrate="match-${matchNumber}-${side}-logo"]`,
    );
    const band = img?.closest(".team-band");

    if (band instanceof HTMLElement) {
      band.dataset.hasCrest = logoHasCrest(img) ? "true" : "false";
    }
  }
};

const syncResultLength = (module, matchNumber) => {
  const result = module.querySelector(
    `[data-hydrate="match-${matchNumber}-result"]`,
  );

  if (!(result instanceof HTMLElement)) {
    return;
  }

  const text = result.textContent?.trim() ?? "";
  result.dataset.length = text.length > 48 ? "long" : "normal";
};

/**
 * @param {number} matchNumber
 * @param {Element} module
 */
export function syncScorelineMatchModule(matchNumber, module) {
  const battingCount = countPerformanceRows(matchNumber, "batter");
  const bowlingCount = countPerformanceRows(matchNumber, "bowler");
  const panelCount = (battingCount > 0 ? 1 : 0) + (bowlingCount > 0 ? 1 : 0);
  const hasPerformances = panelCount > 0;

  if (!(module instanceof HTMLElement)) {
    return;
  }

  module.classList.toggle("without-performances", !hasPerformances);
  module.dataset.performanceCount = String(panelCount);

  syncOversVisibility(module, matchNumber);
  syncPerformanceRows(module);
  syncCrestStates(module, matchNumber);
  syncResultLength(module, matchNumber);

  const battingPanel = module.querySelector(".performance-panel:first-child");
  const bowlingPanel = module.querySelector(".performance-panel:last-child");

  if (battingPanel instanceof HTMLElement) {
    battingPanel.dataset.state = battingCount > 0 ? "filled" : "empty";
  }

  if (bowlingPanel instanceof HTMLElement) {
    bowlingPanel.dataset.state = bowlingCount > 0 ? "filled" : "empty";
  }

  const venue = module.querySelector(
    `[data-hydrate="match-${matchNumber}-ground"]`,
  );
  if (venue?.textContent) {
    venue.textContent = dedupeVenueLabel(venue.textContent);
  }
}
