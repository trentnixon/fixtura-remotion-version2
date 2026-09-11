import { describe, expect, it } from "vitest";
import { resolveScorelineUpcomingClubSides } from "./resolveScorelineUpcomingClubSides";

describe("resolveScorelineUpcomingClubSides", () => {
  it("marks home as club when home team matches club focus", () => {
    expect(
      resolveScorelineUpcomingClubSides(
        "Sunshine Coast",
        "Wide Bay",
        "Sunshine Coast Cricket Club",
      ),
    ).toEqual({ homeIsClub: true, awayIsClub: false });
  });

  it("marks away as club when only away matches", () => {
    expect(
      resolveScorelineUpcomingClubSides(
        "Wide Bay",
        "Sunshine Coast",
        "Sunshine Coast Cricket Club",
      ),
    ).toEqual({ homeIsClub: false, awayIsClub: true });
  });

  it("marks neither side when club focus is too short", () => {
    expect(
      resolveScorelineUpcomingClubSides("A Team", "B Team", "AB Club"),
    ).toEqual({ homeIsClub: false, awayIsClub: false });
  });

  it("marks neither side when no team matches", () => {
    expect(
      resolveScorelineUpcomingClubSides(
        "Wide Bay",
        "Gold Coast",
        "Sunshine Coast Cricket Club",
      ),
    ).toEqual({ homeIsClub: false, awayIsClub: false });
  });
});
