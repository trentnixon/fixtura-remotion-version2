import { describe, expect, it } from "vitest";
import sampleResults from "../../../../../testData/samples/Cricket/Cricket_Results.json";
import { castToMatchResults } from "./calculations";

describe("castToMatchResults", () => {
  it("normalizes innings-grouped bowling onto the performing fixture team", () => {
    const [match] = castToMatchResults(sampleResults.data);

    expect(
      match.homeTeam.battingPerformances.map((player) => player.player),
    ).toEqual(["Melissa Lewis", "Eden Carter", "Melinda Santer"]);
    expect(
      match.homeTeam.bowlingPerformances.map((player) => player.player),
    ).toEqual(["Waller", "Baker (c)", "Cahill"]);
    expect(
      match.awayTeam.battingPerformances.map((player) => player.player),
    ).toEqual([]);
    expect(
      match.awayTeam.bowlingPerformances.map((player) => player.player),
    ).toEqual([]);
  });
});
