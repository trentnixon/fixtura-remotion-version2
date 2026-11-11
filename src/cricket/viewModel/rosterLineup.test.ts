import { describe, expect, it } from "vitest";
import { parseRosterPlayerEntry } from "./rosterPlayerEntry";
import { resolveRosterDensity } from "./rosterDensity";
import { resolveRosterLineup } from "./rosterLineup";

describe("parseRosterPlayerEntry", () => {
  it("parses captain from second line", () => {
    expect(parseRosterPlayerEntry("Dean Jones\nc")).toEqual({
      emptyRoster: false,
      name: "Dean Jones",
      badges: [{ label: "C", captain: true }],
    });
  });

  it("parses vice captain from second line", () => {
    expect(parseRosterPlayerEntry("Beau Pearson\nvc")).toEqual({
      emptyRoster: false,
      name: "Beau Pearson",
      badges: [{ label: "VC", captain: false }],
    });
  });

  it("strips wicket keeper marker into a badge", () => {
    expect(parseRosterPlayerEntry("Alex Keeper (WK)")).toEqual({
      emptyRoster: false,
      name: "Alex Keeper",
      badges: [{ label: "WK", captain: false }],
    });
  });

  it("marks empty roster placeholders", () => {
    expect(
      parseRosterPlayerEntry("No players allocated to line-up"),
    ).toEqual({
      emptyRoster: true,
      name: "No players allocated to line-up",
      badges: [],
    });
  });
});

describe("resolveRosterDensity", () => {
  it("uses design thresholds at 11 and 14 players", () => {
    expect(resolveRosterDensity(11)).toBe("normal");
    expect(resolveRosterDensity(12)).toBe("compact");
    expect(resolveRosterDensity(14)).toBe("compact");
    expect(resolveRosterDensity(15)).toBe("tight");
  });
});

describe("resolveRosterLineup", () => {
  it("returns a single empty state when roster is unavailable", () => {
    expect(resolveRosterLineup([])).toEqual({
      kind: "empty",
      message: "No players allocated to line-up",
    });
  });

  it("builds parsed player rows with design density", () => {
    const players = ["Stephen Winchester", "Dean Jones\nc", "Beau Pearson\nvc"];

    expect(resolveRosterLineup(players)).toEqual({
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
