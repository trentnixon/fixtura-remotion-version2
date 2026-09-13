import { syncScorelineTotwLayout } from "../../scoreline-layout.js";
import { mountScorelineTotwPlayers } from "./totw-players.js";

/** @param {import("./types.js").PopulationArgs} args */
export function populateTeamOfTheWeek({ fixture }) {
  const players = Array.isArray(fixture.data) ? fixture.data : [];
  mountScorelineTotwPlayers(players);
  syncScorelineTotwLayout(document);
}
