import { describe, expect, it } from "vitest";
import sampleResults from "../../../../../testData/samples/Cricket/Cricket_Results.json";
import { castToMatchResults } from "./calculations";

describe("castToMatchResults", () => {
  it("normalizes innings-grouped bowling onto the performing fixture team", () => {
    const [match] = castToMatchResults(sampleResults.data);

    expect(
      match.homeTeam.battingPerformances.map((player) => player.player),
    ).toEqual(["Joe Root", "Eoin Morgan", "Ben Stokes"]);
    expect(
      match.homeTeam.bowlingPerformances.map((player) => player.player),
    ).toEqual(["Jofra Archer", "Mark Wood", "Adil Rashid"]);
    expect(
      match.awayTeam.battingPerformances.map((player) => player.player),
    ).toEqual(["Faf du Plessis", "Quinton de Kock", "Rassie van der Dussen"]);
    expect(
      match.awayTeam.bowlingPerformances.map((player) => player.player),
    ).toEqual(["Kagiso Rabada", "Imran Tahir", "Lungisani Ngidi"]);
  });
});
