import { syncScorelineLadderLayout } from "../../scoreline-layout.js";

const DEFAULT_TEAM_COUNT = 11;

/**
 * @param {unknown} team
 */
function resolveLogo(team) {
  if (!team || typeof team !== "object") {
    return "";
  }
  const record = /** @type {Record<string, unknown>} */ (team);
  const candidate = record.clubLogo ?? record.playHQLogo ?? record.teamLogo;
  if (!candidate) {
    return "";
  }
  if (typeof candidate === "string") {
    return candidate;
  }
  if (candidate && typeof candidate === "object" && "url" in candidate) {
    return String(/** @type {{ url?: string }} */ (candidate).url ?? "");
  }
  return "";
}

/**
 * @param {number} rowCount
 */
function resolveLadderDensity(rowCount) {
  if (rowCount <= 11) {
    return "normal";
  }
  if (rowCount <= 14) {
    return "compact";
  }
  return "tight";
}

/**
 * @param {Document} document
 * @param {number} teamCount
 */
function mountLadderRows(document, teamCount = DEFAULT_TEAM_COUNT) {
  const container = document.querySelector(".ladder-rows");
  const template = document.getElementById("ladder-row-template");
  if (!(container instanceof HTMLElement)) {
    return;
  }

  container.dataset.density = resolveLadderDensity(teamCount);
  container.dataset.creases = "false";

  const staticRows = container.querySelectorAll(".ladder-entry");
  if (
    teamCount <= DEFAULT_TEAM_COUNT &&
    staticRows.length >= DEFAULT_TEAM_COUNT
  ) {
    staticRows.forEach((entry, index) => {
      if (!(entry instanceof HTMLElement)) {
        return;
      }
      entry.dataset.teamIndex = String(index);
      entry.dataset.empty = index >= teamCount ? "true" : "false";
      const row = entry.querySelector(".ladder-row");
      if (row instanceof HTMLElement) {
        row.dataset.teamIndex = String(index);
      }
    });
    return;
  }

  if (!(template instanceof HTMLTemplateElement)) {
    return;
  }

  container.innerHTML = "";

  for (let index = 0; index < teamCount; index += 1) {
    const rowNumber = index + 1;
    const fragment = template.content.cloneNode(true);
    const entry = fragment.querySelector(".ladder-entry");
    const row = fragment.querySelector(".ladder-row");
    if (!(entry instanceof HTMLElement) || !(row instanceof HTMLElement)) {
      continue;
    }

    entry.dataset.teamIndex = String(index);
    row.dataset.teamIndex = String(index);

    const rank = row.querySelector(".ladder-rank.ladder-cell, .ladder-rank");
    const team = row.querySelector(".ladder-team");
    const stats = row.querySelectorAll(".ladder-stat");
    const keys = ["p", "w", "l", "bye", "pts"];

    if (rank instanceof HTMLElement) {
      rank.dataset.hydrate = `team-${rowNumber}-pos`;
      rank.textContent = String(rowNumber);
    }

    if (team instanceof HTMLElement) {
      team.dataset.hydrate = `team-${rowNumber}-name`;
      team.textContent = "Team";
    }

    stats.forEach((stat, statIndex) => {
      if (!(stat instanceof HTMLElement)) {
        return;
      }
      stat.dataset.hydrate = `team-${rowNumber}-${keys[statIndex]}`;
      stat.textContent = "0";
    });

    container.appendChild(fragment);
  }
}

/**
 * @param {import("./types.js").PopulationArgs} args
 */
export function populateLadder({ canvas, fixture }) {
  const document = canvas.ownerDocument;
  const ladder =
    /** @type {{ gradeName?: string; bias?: string; League?: unknown[] }} */ (
      /** @type {{ data?: unknown[] }} */ (fixture)?.data?.[0]
    );
  const league = Array.isArray(ladder?.League) ? ladder.League : [];
  const teamCount = Math.max(league.length || DEFAULT_TEAM_COUNT, 1);

  const gradeWrap = canvas.querySelector(".ladder-grade");
  if (gradeWrap instanceof HTMLElement) {
    gradeWrap.dataset.empty = ladder?.gradeName?.trim() ? "false" : "true";
  }

  mountLadderRows(document, teamCount);

  const bias = ladder?.bias;
  const clubName =
    /** @type {{ videoMeta?: { club?: { name?: string } } }} */ (fixture)
      .videoMeta?.club?.name ?? "";
  const clubFocus = clubName.replace(/\s+cricket club.*$/i, "").trim();

  canvas.querySelectorAll(".ladder-entry").forEach((entry, index) => {
    if (!(entry instanceof HTMLElement)) {
      return;
    }

    const team = /** @type {Record<string, unknown>} */ (league[index]);
    const row = entry.querySelector(".ladder-row");
    const img = entry.querySelector(".ladder-mark img");
    const rank = row?.querySelector(".ladder-rank.ladder-cell, .ladder-rank");
    const teamName = row?.querySelector(".ladder-team");
    const stats = row?.querySelectorAll(".ladder-stat");

    const name = typeof team?.teamName === "string" ? team.teamName.trim() : "";
    if (!name) {
      entry.dataset.empty = "true";
      return;
    }

    entry.dataset.empty = "false";

    if (rank instanceof HTMLElement && team?.position != null) {
      rank.textContent = String(team.position);
    }

    if (teamName instanceof HTMLElement) {
      teamName.textContent = name;
    }

    if (stats?.length >= 5) {
      stats[0].textContent = String(team?.P ?? "0");
      stats[1].textContent = String(team?.W ?? "0");
      stats[2].textContent = String(team?.L ?? "0");
      stats[3].textContent = String(team?.BYE ?? "0");
      stats[4].textContent = String(team?.PTS ?? "0");
    }

    if (row instanceof HTMLElement) {
      const isBias =
        (typeof bias === "string" && bias.length > 0 && name === bias) ||
        (!bias && clubFocus.length > 3 && name.includes(clubFocus));
      if (isBias) {
        row.dataset.bias = "true";
      } else {
        delete row.dataset.bias;
      }
    }

    const logoUrl = resolveLogo(team);
    if (img instanceof HTMLImageElement && logoUrl) {
      img.src = logoUrl;
      img.hidden = false;
      img.alt = `${name} logo`;
    }
  });

  syncScorelineLadderLayout(document);
}
