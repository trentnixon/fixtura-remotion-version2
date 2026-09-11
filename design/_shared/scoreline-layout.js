const isPrefixSegment = (prefix, candidate) => {
  const prefixKey = prefix.toLowerCase();
  const candidateKey = candidate.toLowerCase();

  if (candidateKey.length <= prefixKey.length) {
    return false;
  }

  if (!candidateKey.startsWith(prefixKey)) {
    return false;
  }

  const nextChar = candidateKey[prefixKey.length];
  return nextChar === " " || nextChar === "/";
};

const collapsePrefixVenueSegments = (parts) =>
  parts.filter(
    (part, index) =>
      !parts.some(
        (other, otherIndex) =>
          index !== otherIndex && isPrefixSegment(part, other),
      ),
  );

const dedupeVenueLabel = (value) => {
  const parts = String(value)
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return String(value).trim();
  }

  const seen = new Set();
  const unique = [];

  for (const part of parts) {
    const key = part.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(part);
  }

  return collapsePrefixVenueSegments(unique).join(" / ");
};

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

const logoHasCrest = (img) => {
  if (!(img instanceof HTMLImageElement)) {
    return false;
  }

  const src = img.getAttribute("src")?.trim();
  return Boolean(src && !img.hidden);
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

export function syncScorelineOrganisationCrest(root = document) {
  const orgLogo = root.querySelector('[data-hydrate="club-logo"]');
  const orgMark = orgLogo?.closest(".organisation-mark");
  if (orgMark instanceof HTMLElement) {
    orgMark.dataset.hasCrest = logoHasCrest(orgLogo) ? "true" : "false";
  }
}

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

/**
 * @param {ParentNode} root
 */
export function syncScorelineTotwLayout(root = document) {
  root.querySelectorAll(".totw-entry").forEach((entry, index) => {
    if (!(entry instanceof HTMLElement)) {
      return;
    }

    const img = entry.querySelector(".totw-mark img");
    const mark = entry.querySelector(".totw-mark");
    const name = entry.querySelector(".totw-name");

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

/**
 * @param {ParentNode} root
 */
export function syncScorelineRosterLayout(root = document) {
  const homeBand = root
    .querySelector('[data-hydrate="home-logo"]')
    ?.closest(".team-band");
  const awayBand = root
    .querySelector('[data-hydrate="away-logo"]')
    ?.closest(".team-band");

  for (const [band, logoKey] of [
    [homeBand, "home-logo"],
    [awayBand, "away-logo"],
  ]) {
    if (!(band instanceof HTMLElement)) {
      continue;
    }

    const img = root.querySelector(`[data-hydrate="${logoKey}"]`);
    band.dataset.hasCrest = logoHasCrest(img) ? "true" : "false";
  }

  if (homeBand instanceof HTMLElement && awayBand instanceof HTMLElement) {
    const homeIsClub = homeBand.dataset.clubTeam === "true";
    if (
      homeBand.dataset.clubTeam === "true" ||
      homeBand.dataset.clubTeam === "false"
    ) {
      awayBand.dataset.clubTeam = homeIsClub ? "false" : "true";
    }
  }

  const venue = root.querySelector('[data-hydrate="fixture-ground"]');
  if (venue?.textContent) {
    venue.textContent = dedupeVenueLabel(venue.textContent);
  }
}

/**
 * @param {ParentNode} root
 */
export function syncScorelineUpcomingLayout(root = document) {
  const clubName =
    root.querySelector('[data-hydrate="club-name"]')?.textContent?.trim() ?? "";
  const clubFocus = clubName.replace(/\s+cricket club.*$/i, "").trim();

  root.querySelectorAll(".fixture-card").forEach((card, index) => {
    if (!(card instanceof HTMLElement)) {
      return;
    }

    const fixtureNumber = index + 1;

    const homeBand = root
      .querySelector(`[data-hydrate="fixture-${fixtureNumber}-home-logo"]`)
      ?.closest(".team-band");
    const awayBand = root
      .querySelector(`[data-hydrate="fixture-${fixtureNumber}-away-logo"]`)
      ?.closest(".team-band");
    const homeTeam =
      root
        .querySelector(`[data-hydrate="fixture-${fixtureNumber}-home-team"]`)
        ?.textContent?.trim() ?? "";
    const awayTeam =
      root
        .querySelector(`[data-hydrate="fixture-${fixtureNumber}-away-team"]`)
        ?.textContent?.trim() ?? "";

    const teamIsClub = (name) =>
      clubFocus.length > 3 &&
      name.toLowerCase().includes(clubFocus.toLowerCase());
    const homeIsClub = teamIsClub(homeTeam);
    const awayIsClub = teamIsClub(awayTeam);

    for (const [band, side] of [
      [homeBand, "home"],
      [awayBand, "away"],
    ]) {
      if (!(band instanceof HTMLElement)) {
        continue;
      }

      const img = root.querySelector(
        `[data-hydrate="fixture-${fixtureNumber}-${side}-logo"]`,
      );
      band.dataset.hasCrest = logoHasCrest(img) ? "true" : "false";
      delete band.dataset.clubTeam;
    }

    if (homeIsClub && homeBand instanceof HTMLElement) {
      homeBand.dataset.clubTeam = "true";
    } else if (awayIsClub && awayBand instanceof HTMLElement) {
      awayBand.dataset.clubTeam = "true";
      if (homeBand instanceof HTMLElement) {
        homeBand.dataset.clubTeam = "false";
      }
    }

    const ground = root.querySelector(
      `[data-hydrate="fixture-${fixtureNumber}-ground"]`,
    );
    if (ground?.textContent) {
      ground.textContent = dedupeVenueLabel(ground.textContent);
    }
  });
}

/**
 * @param {string} text
 */
const runsFromScore = (text) => {
  const value = String(text).trim();
  const slashPart = value.split("/")[1];
  if (slashPart) {
    return slashPart.replace(/\D.*$/, "").trim();
  }

  return value.match(/\d+/)?.[0] ?? "";
};

/**
 * Optional oversized score watermark for single-match hero assets.
 *
 * @param {HTMLElement} canvas
 */
export function syncScoreWatermark(canvas) {
  if (!(canvas instanceof HTMLElement)) {
    return;
  }

  if (canvas.dataset.scoreWatermark !== "enabled") {
    canvas.querySelector(".score-watermark")?.remove();
    return;
  }

  const homeScore =
    canvas.querySelector('[data-hydrate="match-1-home-score"]')?.textContent ??
    "";
  const awayScore =
    canvas.querySelector('[data-hydrate="match-1-away-score"]')?.textContent ??
    "";
  const homeRuns = Number(runsFromScore(homeScore)) || 0;
  const awayRuns = Number(runsFromScore(awayScore)) || 0;
  const watermarkScore =
    awayRuns > homeRuns ? runsFromScore(awayScore) : runsFromScore(homeScore);

  if (!watermarkScore) {
    return;
  }

  let watermark = canvas.querySelector(".score-watermark");
  if (!(watermark instanceof HTMLElement)) {
    watermark = document.createElement("div");
    watermark.className = "score-watermark";
    watermark.setAttribute("aria-hidden", "true");
    canvas.append(watermark);
  }

  watermark.textContent = watermarkScore;
}

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
