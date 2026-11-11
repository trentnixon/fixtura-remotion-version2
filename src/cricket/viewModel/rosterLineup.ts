import {
  parseRosterPlayerEntry,
  type CricketRosterBadge,
} from "./rosterPlayerEntry";
import {
  resolveRosterDensity,
  type CricketRosterDensity,
} from "./rosterDensity";

export type CricketRosterPlayerRow = {
  index: number;
  name: string;
  badges: CricketRosterBadge[];
};

export type CricketRosterLineup =
  | { kind: "empty"; message: string }
  | {
      kind: "players";
      density: CricketRosterDensity;
      rows: CricketRosterPlayerRow[];
    };

export const resolveRosterLineup = (
  teamRoster: string[],
): CricketRosterLineup => {
  const players = teamRoster ?? [];

  if (
    players.length === 0 ||
    players.every((entry) => parseRosterPlayerEntry(entry).emptyRoster)
  ) {
    return {
      kind: "empty",
      message: "No players allocated to line-up",
    };
  }

  const rows: CricketRosterPlayerRow[] = [];
  let displayIndex = 0;

  for (const rawPlayer of players) {
    const parsed = parseRosterPlayerEntry(rawPlayer);
    if (parsed.emptyRoster) {
      continue;
    }

    displayIndex += 1;
    rows.push({
      index: displayIndex,
      name: parsed.name,
      badges: parsed.badges,
    });
  }

  if (rows.length === 0) {
    return {
      kind: "empty",
      message: "No players allocated to line-up",
    };
  }

  return {
    kind: "players",
    density: resolveRosterDensity(players.length),
    rows,
  };
};
