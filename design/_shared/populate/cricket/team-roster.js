import { syncScorelineRosterLayout } from "../../scoreline-layout.js";
import { mountScorelineRosterRows } from "./roster-rows.js";

/**
 * @param {string} gradeName
 * @param {string} value
 */
function isMetaRedundantWithGrade(gradeName, value) {
  const grade = String(gradeName ?? "")
    .trim()
    .toLowerCase();
  const token = String(value ?? "")
    .trim()
    .toLowerCase();
  if (!token) {
    return true;
  }
  if (!grade) {
    return false;
  }
  return grade.includes(token);
}

/** @param {import("./types.js").PopulationArgs} args */
export function populateTeamRoster({ fixture, canvas }) {
  const root = canvas instanceof HTMLElement ? canvas : document;

  const gradeLabel =
    root.querySelector('[data-hydrate="grade-name"]')?.textContent?.trim() ??
    "";

  let visibleMetaCount = 0;
  root.querySelectorAll(".meta-chip").forEach((chip) => {
    if (!(chip instanceof HTMLElement)) {
      return;
    }
    const text = chip.textContent?.trim() ?? "";
    const redundant = isMetaRedundantWithGrade(gradeLabel, text);
    const empty = !text || redundant;
    chip.dataset.empty = empty ? "true" : "false";
    if (!empty) {
      visibleMetaCount += 1;
    }
  });

  const metaWrap = root.querySelector("[data-roster-meta]");
  if (metaWrap instanceof HTMLElement) {
    metaWrap.hidden = visibleMetaCount === 0;
  }

  const gradeRail = root.querySelector("[data-roster-grade-rail]");
  if (gradeRail instanceof HTMLElement) {
    const gradeName = root.querySelector('[data-hydrate="grade-name"]');
    const hasGrade = Boolean(gradeName?.textContent?.trim());
    gradeRail.dataset.empty = hasGrade ? "false" : "true";
  }

  const roster = fixture?.data?.[0];
  if (roster) {
    const squadTeam = root.querySelector("[data-roster-squad-team]");
    if (squadTeam instanceof HTMLElement) {
      squadTeam.textContent = roster.isHomeTeam
        ? roster.teamHome
        : roster.teamAway;
    }

    mountScorelineRosterRows(
      Array.isArray(roster.teamRoster) ? roster.teamRoster : [],
    );
  }

  syncScorelineRosterLayout(root);

  const homeBand = root
    .querySelector('[data-hydrate="home-logo"]')
    ?.closest(".team-band");
  const awayBand = root
    .querySelector('[data-hydrate="away-logo"]')
    ?.closest(".team-band");
  const homeName = root.querySelector('[data-hydrate="home-team"]');
  const awayName = root.querySelector('[data-hydrate="away-team"]');

  if (homeName instanceof HTMLElement && homeBand instanceof HTMLElement) {
    homeName.dataset.clubTeam = homeBand.dataset.clubTeam ?? "";
  }
  if (awayName instanceof HTMLElement && awayBand instanceof HTMLElement) {
    awayName.dataset.clubTeam = awayBand.dataset.clubTeam ?? "";
  }
}
