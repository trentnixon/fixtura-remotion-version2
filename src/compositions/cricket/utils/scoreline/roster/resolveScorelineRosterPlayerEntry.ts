import {
  parseRosterPlayerEntry,
  resolveRosterDensity,
  type CricketRosterBadge,
} from "../../../../../cricket/viewModel";

export type ScorelineRosterBadge = CricketRosterBadge;

export type ScorelineRosterPlayerRow = {
  index: number;
  name: string;
  badges: ScorelineRosterBadge[];
};

export type ScorelineRosterLineup =
  | { kind: "empty"; message: string }
  | {
      kind: "players";
      density: "normal" | "compact" | "tight";
      rows: ScorelineRosterPlayerRow[];
    };

export const resolveScorelineRosterPlayerEntry = parseRosterPlayerEntry;

export const resolveScorelineRosterDensity = resolveRosterDensity;

export const resolveScorelineRosterLineup = (
  teamRoster: string[],
): ScorelineRosterLineup => {
  const players = teamRoster ?? [];

  if (
    players.length === 0 ||
    players.every(
      (entry) => resolveScorelineRosterPlayerEntry(entry).emptyRoster,
    )
  ) {
    return {
      kind: "empty",
      message: "No players allocated to line-up",
    };
  }

  const rows: ScorelineRosterPlayerRow[] = [];
  let displayIndex = 0;

  for (const rawPlayer of players) {
    const parsed = resolveScorelineRosterPlayerEntry(rawPlayer);
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
    density: resolveScorelineRosterDensity(players.length),
    rows,
  };
};
