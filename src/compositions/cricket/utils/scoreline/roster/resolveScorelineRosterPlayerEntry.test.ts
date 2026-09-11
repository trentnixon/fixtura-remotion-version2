import { describe, expect, it } from "vitest";
import {
  resolveScorelineRosterDensity,
  resolveScorelineRosterLineup,
  resolveScorelineRosterPlayerEntry,
} from "./resolveScorelineRosterPlayerEntry";

describe("resolveScorelineRosterPlayerEntry", () => {
  it("parses captain from second line", () => {
    expect(resolveScorelineRosterPlayerEntry("Dean Jones\nc")).toEqual({
      emptyRoster: false,
      name: "Dean Jones",
      badges: [{ label: "C", captain: true }],
    });
  });

  it("parses vice captain from second line", () => {
    expect(resolveScorelineRosterPlayerEntry("Beau Pearson\nvc")).toEqual({
      emptyRoster: false,
      name: "Beau Pearson",
      badges: [{ label: "VC", captain: false }],
    });
  });

  it("strips wicket keeper marker into a badge", () => {
    expect(resolveScorelineRosterPlayerEntry("Alex Keeper (WK)")).toEqual({
      emptyRoster: false,
      name: "Alex Keeper",
      badges: [{ label: "WK", captain: false }],
    });
  });

  it("marks empty roster placeholders", () => {
    expect(
      resolveScorelineRosterPlayerEntry("No players allocated to line-up"),
    ).toEqual({
      emptyRoster: true,
      name: "No players allocated to line-up",
      badges: [],
    });
  });
});

describe("resolveScorelineRosterDensity", () => {
  it("uses design thresholds at 11 and 14 players", () => {
    expect(resolveScorelineRosterDensity(11)).toBe("normal");
    expect(resolveScorelineRosterDensity(12)).toBe("compact");
    expect(resolveScorelineRosterDensity(14)).toBe("compact");
    expect(resolveScorelineRosterDensity(15)).toBe("tight");
  });
});

describe("resolveScorelineRosterLineup", () => {
  it("returns a single empty state when roster is unavailable", () => {
    expect(resolveScorelineRosterLineup([])).toEqual({
      kind: "empty",
      message: "No players allocated to line-up",
    });
  });

  it("builds parsed player rows with design density", () => {
    const players = ["Stephen Winchester", "Dean Jones\nc", "Beau Pearson\nvc"];

    expect(resolveScorelineRosterLineup(players)).toEqual({
      kind: "players",
      density: "normal",
      rows: [
        { index: 1, name: "Stephen Winchester", badges: [] },
        {
          index: 2,
          name: "Dean Jones",
          badges: [{ label: "C", captain: true }],
        },
        {
          index: 3,
          name: "Beau Pearson",
          badges: [{ label: "VC", captain: false }],
        },
      ],
    });
  });
});
