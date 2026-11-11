import { describe, expect, it } from "vitest";
import { parseRosterPlayerEntry } from "./rosterPlayerEntry";

describe("parseRosterPlayerEntry", () => {
  it("marks empty roster payloads", () => {
    expect(parseRosterPlayerEntry("")).toMatchObject({
      emptyRoster: true,
      name: "No players allocated",
    });
  });

  it("parses captain and wicket-keeper badges", () => {
    const result = parseRosterPlayerEntry("J Smith (WK)\nc");
    expect(result).toEqual({
      emptyRoster: false,
      name: "J Smith",
      badges: [
        { label: "C", captain: true },
        { label: "WK", captain: false },
      ],
    });
  });
});
