export type ScorelineRosterBadge = {
  label: string;
  captain: boolean;
};

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

/** Mirrors design/variants/scoreline/cricket/team-roster.html parsePlayerEntry. */
export const resolveScorelineRosterPlayerEntry = (
  raw: string,
): {
  emptyRoster: boolean;
  name: string;
  badges: ScorelineRosterBadge[];
} => {
  const value = String(raw ?? "").trim();

  if (!value || /no players allocated/i.test(value)) {
    return {
      emptyRoster: true,
      name: value || "No players allocated",
      badges: [],
    };
  }

  const lines = value.split("\n");
  let name = lines[0]?.trim() ?? "";
  const badges: ScorelineRosterBadge[] = [];

  const role = lines[1]?.trim().toLowerCase() ?? "";
  if (role === "c") {
    badges.push({ label: "C", captain: true });
  } else if (role === "vc") {
    badges.push({ label: "VC", captain: false });
  }

  if (/\(WK\)/i.test(name)) {
    badges.push({ label: "WK", captain: false });
    name = name.replace(/\(WK\)/gi, "").trim();
  }

  return { emptyRoster: false, name, badges };
};

/** Mirrors design team-roster.html resolveDensity. */
export const resolveScorelineRosterDensity = (
  playerCount: number,
): "normal" | "compact" | "tight" => {
  if (playerCount <= 11) {
    return "normal";
  }

  if (playerCount <= 14) {
    return "compact";
  }

  return "tight";
};

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
