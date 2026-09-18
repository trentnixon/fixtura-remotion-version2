import type { TeamOfTheWeekPlayer } from "../../../TeamOfTheWeek/types";

/** Mirrors design/_shared/populate/cricket/totw-players.js column split. */
export const splitTotwPlayerColumns = (
  players: TeamOfTheWeekPlayer[],
): [TeamOfTheWeekPlayer[], TeamOfTheWeekPlayer[]] => {
  const splitAt = Math.ceil(players.length / 2);
  return [players.slice(0, splitAt), players.slice(splitAt)];
};
