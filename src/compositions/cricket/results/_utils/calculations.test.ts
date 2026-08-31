import { describe, expect, it } from "vitest";
import sampleResults from "../../../../../testData/samples/Cricket/Cricket_Results.json";
import { castToMatchResults } from "./calculations";

describe("castToMatchResults", () => {
  it("normalizes innings-grouped bowling onto the performing fixture team", () => {
    const [match] = castToMatchResults(sampleResults.data);

    expect(
      match.homeTeam.battingPerformances.map((player) => player.player),
    ).toEqual(["Stephen Roberts", "Ian Reimers", "Les Amos"]);
    expect(
      match.homeTeam.bowlingPerformances.map((player) => player.player),
    ).toEqual(["Rathie", "Whittaker", "Reimers"]);
    expect(
      match.awayTeam.battingPerformances.map((player) => player.player),
    ).toEqual(["Michael Greco", "Neil Karunasekara", "Dominic Gibson"]);
    expect(
      match.awayTeam.bowlingPerformances.map((player) => player.player),
    ).toEqual(["Greco", "Townsend", "Gibson"]);
  });
});
