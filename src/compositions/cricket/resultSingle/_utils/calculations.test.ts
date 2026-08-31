import { describe, expect, it } from "vitest";
import sampleResults from "../../../../../testData/samples/Cricket/Cricket_Results.json";
import { castToMatchResults } from "./calculations";

describe("castToMatchResults", () => {
  it("normalizes innings-grouped bowling for single-result assets", () => {
    const [match] = castToMatchResults(sampleResults.data);

    expect(
      match.homeTeam.bowlingPerformances.map((player) => player.player),
    ).toEqual(["Rathie", "Whittaker", "Reimers"]);
    expect(
      match.awayTeam.bowlingPerformances.map((player) => player.player),
    ).toEqual(["Greco", "Townsend", "Gibson"]);
  });
});
