import { syncScorelineTotwLayout } from "../../scoreline-layout.js";
import { mountScorelineTotwPlayers } from "./totw-players.js";

/** @param {import("./types.js").PopulationArgs} args */
export function populateTeamOfTheWeek({ fixture, canvas }) {
  const root = canvas instanceof HTMLElement ? canvas : document;
  const players = Array.isArray(fixture.data) ? fixture.data : [];
  mountScorelineTotwPlayers(players, root);
  syncScorelineTotwLayout(root);
}
