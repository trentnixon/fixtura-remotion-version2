import { describe, expect, it } from "vitest";
import cricketResults from "../../../../../../testData/samples/Cricket/Cricket_Results.json";
import type { MatchResult } from "../../../results/_types/types";
import {
  resolveScorelineClubTeam,
  resolveScorelineResultSinglePerformances,
} from "./resolveScorelineResultSinglePerformances";
import { resolveScorelineMatchPerformances } from "./resolveScorelineMatchPerformances";

const matches = cricketResults.data as MatchResult[];

describe("resolveScorelineClubTeam", () => {
  it("returns home when home is club team", () => {
    const match: MatchResult = {
      ...matches[0],
      homeTeam: { ...matches[0].homeTeam, isClubTeam: true },
      awayTeam: { ...matches[0].awayTeam, isClubTeam: false },
    };

    expect(resolveScorelineClubTeam(match)?.name).toBe(match.homeTeam.name);
  });

  it("returns away when away is club team", () => {
    const match: MatchResult = {
      ...matches[0],
      homeTeam: { ...matches[0].homeTeam, isClubTeam: false },
      awayTeam: { ...matches[0].awayTeam, isClubTeam: true },
    };

    expect(resolveScorelineClubTeam(match)?.name).toBe(match.awayTeam.name);
  });

  it("falls back to club name when isClubTeam flags are unset", () => {
    const match: MatchResult = {
      ...matches[0],
      homeTeam: {
        ...matches[0].homeTeam,
        isClubTeam: false,
        name: "Sunshine Coast Premier",
      },
      awayTeam: {
        ...matches[0].awayTeam,
        isClubTeam: false,
        name: "Queens 1st Grade",
      },
    };

    expect(
      resolveScorelineClubTeam(match, "Sunshine Coast Cricket Club")?.name,
    ).toBe("Sunshine Coast Premier");
  });
});

describe("resolveScorelineResultSinglePerformances", () => {
  it("uses club team batting and bowling when isClubTeam is set", () => {
    const match: MatchResult = {
      ...matches[0],
      homeTeam: { ...matches[0].homeTeam, isClubTeam: false },
      awayTeam: {
        ...matches[0].awayTeam,
        isClubTeam: true,
        battingPerformances: [
          {
            player: "Club Batter",
            runs: 50,
            balls: 30,
            fours: 0,
            sixes: 0,
            SR: 166.67,
            team: matches[0].awayTeam.name,
            notOut: false,
          },
        ],
        bowlingPerformances: [
          {
            player: "Club Bowler",
            overs: 4,
            maidens: 0,
            runs: 20,
            wickets: 3,
            economy: "5.00",
            team: matches[0].awayTeam.name,
          },
        ],
      },
    };

    const club = resolveScorelineResultSinglePerformances(match);
    const bind = resolveScorelineMatchPerformances(match);

    expect(
      club.battingRows[0]?.kind === "batting" && club.battingRows[0].player,
    ).toBe("Club Batter");
    expect(
      club.bowlingRows[0]?.kind === "bowling" && club.bowlingRows[0].player,
    ).toBe("Club Bowler");
    expect(
      bind.battingRows[0]?.kind === "batting" && bind.battingRows[0].player,
    ).toBe("Melissa Lewis");
  });

  it("falls back to bind-map performances when no club team", () => {
    const match: MatchResult = {
      ...matches[0],
      homeTeam: { ...matches[0].homeTeam, isClubTeam: false },
      awayTeam: { ...matches[0].awayTeam, isClubTeam: false },
    };

    expect(resolveScorelineResultSinglePerformances(match)).toEqual(
      resolveScorelineMatchPerformances(match),
    );
  });
});
