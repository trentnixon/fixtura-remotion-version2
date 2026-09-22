import { describe, expect, it } from "vitest";
import sampleResults from "../../../../../testData/samples/Cricket/Cricket_Results.json";
import { castToMatchResults } from "./calculations";

describe("castToMatchResults", () => {
  it("normalizes innings-grouped bowling for single-result assets", () => {
    const [match] = castToMatchResults(sampleResults.data);

    expect(
      match.homeTeam.battingPerformances.map((player) => player.player),
    ).toEqual(["Sam Lickiss (c)", "Jack Lickiss", "James Guthrig"]);
    expect(
      match.homeTeam.bowlingPerformances.map((player) => player.player),
    ).toEqual(["Maloney", "Gregory", "Pedi"]);
    expect(
      match.awayTeam.battingPerformances.map((player) => player.player),
    ).toEqual(["Lachlan King", "Hayden Taylor", "Bailey Garnham"]);
    expect(
      match.awayTeam.bowlingPerformances.map((player) => player.player),
    ).toEqual(["Latimer", "Barclay", "Finn"]);
  });
});
