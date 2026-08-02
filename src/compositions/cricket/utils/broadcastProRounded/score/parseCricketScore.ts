export type ParsedMatchScore =
  | { kind: "yetToBat"; display: string }
  | { kind: "runsOnly"; runs: string; display: string }
  | { kind: "wicketsRuns"; wickets: string; runs: string; display: string }
  | { kind: "plain"; primary: string; display: string };

export type ParsedPlayerStat =
  | { kind: "batting"; primary: string; suffix?: string; display: string }
  | { kind: "bowling"; primary: string; suffix?: string; display: string }
  | { kind: "plain"; primary: string; display: string };

const YET_TO_BAT = "Yet to Bat";

const normalize = (value: string): string => value.trim();

export const parseMatchScore = (value: string): ParsedMatchScore => {
  const trimmed = normalize(value);

  if (!trimmed || trimmed.toUpperCase() === "N/A") {
    return { kind: "yetToBat", display: YET_TO_BAT };
  }

  if (trimmed.toLowerCase() === YET_TO_BAT.toLowerCase()) {
    return { kind: "yetToBat", display: YET_TO_BAT };
  }

  const wicketsRuns = /^(\d+)\/(\d+)$/.exec(trimmed);
  if (wicketsRuns) {
    const wickets = wicketsRuns[1];
    const runs = wicketsRuns[2];
    return {
      kind: "wicketsRuns",
      wickets,
      runs,
      display: `${wickets}/${runs}`,
    };
  }

  if (/^\d+$/.test(trimmed)) {
    return { kind: "runsOnly", runs: trimmed, display: trimmed };
  }

  return { kind: "plain", primary: trimmed, display: trimmed };
};

export const parsePlayerStat = (value: string): ParsedPlayerStat => {
  const trimmed = normalize(value);

  if (!trimmed) {
    return { kind: "plain", primary: "", display: "" };
  }

  const batting = /^(\d+\*?)\s*(\(\d+\))?$/.exec(trimmed);
  if (batting) {
    const primary = batting[1];
    const suffix = batting[2];
    return {
      kind: "batting",
      primary,
      suffix,
      display: suffix ? `${primary} ${suffix}` : primary,
    };
  }

  const bowling = /^(\d+\/\d+)\s*(\(\d+(?:\.\d+)?\))?$/.exec(trimmed);
  if (bowling) {
    const primary = bowling[1];
    const suffix = bowling[2];
    return {
      kind: "bowling",
      primary,
      suffix,
      display: suffix ? `${primary} ${suffix}` : primary,
    };
  }

  return { kind: "plain", primary: trimmed, display: trimmed };
};
