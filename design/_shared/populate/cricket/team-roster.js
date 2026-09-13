import { syncScorelineRosterLayout } from "../../scoreline-layout.js";
import { mountScorelineRosterRows } from "./roster-rows.js";

/** @param {import("./types.js").PopulationArgs} args */
export function populateTeamRoster({ fixture }) {
  document.querySelectorAll(".meta-chip").forEach((chip) => {
    if (chip instanceof HTMLElement) {
      chip.dataset.empty = chip.textContent?.trim() ? "false" : "true";
    }
  });

  const roster = fixture?.data?.[0];
  if (roster) {
    const squadTeam = document.querySelector("[data-roster-squad-team]");
    if (squadTeam instanceof HTMLElement) {
      squadTeam.textContent = roster.isHomeTeam
        ? roster.teamHome
        : roster.teamAway;
    }

    mountScorelineRosterRows(
      Array.isArray(roster.teamRoster) ? roster.teamRoster : [],
    );
  }

  syncScorelineRosterLayout(document);
}
