import { formatRosterPlayerName } from "../../view-model/cricket/rosterPlayerName.js";
import { parseRosterPlayerEntry } from "../../view-model/cricket/rosterPlayerEntry.js";
import { resolveRosterDensity } from "../../view-model/cricket/rosterDensity.js";

export { formatRosterPlayerName };

/** @param {string[]} players */
export function mountScorelineRosterRows(players) {
  const container = document.querySelector("[data-roster-rows]");
  const template = document.getElementById("roster-row-template");
  if (
    !(container instanceof HTMLElement) ||
    !(template instanceof HTMLTemplateElement)
  ) {
    return;
  }

  container.innerHTML = "";

  if (
    players.length === 0 ||
    players.every((entry) => parseRosterPlayerEntry(entry).emptyRoster)
  ) {
    const fragment = template.content.cloneNode(true);
    const entry = fragment.querySelector(".roster-entry");
    const row = fragment.querySelector(".roster-row");
    const index = row?.querySelector(".roster-index");
    const player =
      row?.querySelector(".roster-player__name") ??
      row?.querySelector(".roster-player");
    const badges = row?.querySelector(".roster-badges");
    const crease = fragment.querySelector(".roster-crease");

    if (row instanceof HTMLElement) {
      row.dataset.emptyRoster = "true";
    }
    if (index instanceof HTMLElement) {
      index.hidden = true;
    }
    if (badges instanceof HTMLElement) {
      badges.hidden = true;
    }
    if (player instanceof HTMLElement) {
      player.textContent = "No players allocated to line-up";
    }
    if (crease instanceof HTMLElement) {
      crease.hidden = true;
    }
    if (entry instanceof HTMLElement) {
      container.appendChild(fragment);
    }
    return;
  }

  container.dataset.density = resolveRosterDensity(players.length);

  players.forEach((rawPlayer, playerIndex) => {
    const parsed = parseRosterPlayerEntry(rawPlayer);
    if (parsed.emptyRoster) {
      return;
    }

    const fragment = template.content.cloneNode(true);
    const entry = fragment.querySelector(".roster-entry");
    const row = fragment.querySelector(".roster-row");
    const index = row?.querySelector(".roster-index");
    const player =
      row?.querySelector(".roster-player__name") ??
      row?.querySelector(".roster-player");
    const badges = row?.querySelector(".roster-badges");

    if (index instanceof HTMLElement) {
      index.textContent = String(playerIndex + 1);
    }
    if (player instanceof HTMLElement) {
      const displayName = formatRosterPlayerName(parsed.name);
      player.textContent = displayName;
      player.title = displayName;
    }
    if (badges instanceof HTMLElement) {
      parsed.badges.forEach((badge) => {
        const chip = document.createElement("span");
        chip.className = badge.captain
          ? "roster-badge roster-badge--captain"
          : "roster-badge";
        chip.textContent = badge.label;
        badges.appendChild(chip);
      });
      if (parsed.badges.length === 0) {
        badges.hidden = true;
      }
    }

    if (entry instanceof HTMLElement) {
      container.appendChild(fragment);
    }
  });
}
