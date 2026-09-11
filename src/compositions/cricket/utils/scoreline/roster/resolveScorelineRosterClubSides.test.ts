import { describe, expect, it } from "vitest";
import { resolveScorelineRosterClubSides } from "./resolveScorelineRosterClubSides";

describe("resolveScorelineRosterClubSides", () => {
  it("marks home as club when roster team is home", () => {
    expect(resolveScorelineRosterClubSides(true)).toEqual({
      homeIsClub: true,
      awayIsClub: false,
    });
  });

  it("marks away as club when roster team is away", () => {
    expect(resolveScorelineRosterClubSides(false)).toEqual({
      homeIsClub: false,
      awayIsClub: true,
    });
  });
});
