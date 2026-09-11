import { describe, expect, it } from "vitest";
import cricketResults from "../../../../../../testData/samples/Cricket/Cricket_Results.json";
import type { MatchResult } from "../../../results/_types/types";
import { resolveScorelineMatchPerformances } from "./resolveScorelineMatchPerformances";

const matches = cricketResults.data as MatchResult[];

describe("resolveScorelineMatchPerformances", () => {
  it("match 1: home batting and away bowling (bind-map paths)", () => {
    const match = matches[0];
    const {
      battingRows,
      bowlingRows,
      hasBatting,
      hasBowling,
      performancePanelCount,
    } = resolveScorelineMatchPerformances(match);

    expect(hasBatting).toBe(true);
    expect(hasBowling).toBe(true);
    expect(performancePanelCount).toBe(2);
    expect(battingRows[0]?.kind).toBe("batting");
    expect(battingRows[0]?.kind === "batting" && battingRows[0].player).toBe(
      "Melissa Lewis",
    );
    expect(bowlingRows[0]?.kind).toBe("bowling");
    expect(bowlingRows[0]?.kind === "bowling" && bowlingRows[0].player).toBe(
      "Waller",
    );
  });

  it("match 2: away batting and home bowling when club is home", () => {
    const match = matches[1];
    const {
      battingRows,
      bowlingRows,
      hasBatting,
      hasBowling,
      performancePanelCount,
    } = resolveScorelineMatchPerformances(match);

    expect(hasBatting).toBe(true);
    expect(hasBowling).toBe(true);
    expect(performancePanelCount).toBe(2);
    expect(battingRows[0]?.kind === "batting" && battingRows[0].player).toBe(
      "Belinda Dawney (c)",
    );
    expect(bowlingRows[0]?.kind === "bowling" && bowlingRows[0].player).toBe(
      "Rowley",
    );
  });

  it("returns zero panels when both disciplines are absent", () => {
    const emptyMatch: MatchResult = {
      ...matches[0],
      homeTeam: {
        ...matches[0].homeTeam,
        battingPerformances: [],
        bowlingPerformances: [],
      },
      awayTeam: {
        ...matches[0].awayTeam,
        battingPerformances: [],
        bowlingPerformances: [],
      },
    };

    const { performancePanelCount, hasBatting, hasBowling } =
      resolveScorelineMatchPerformances(emptyMatch);

    expect(performancePanelCount).toBe(0);
    expect(hasBatting).toBe(false);
    expect(hasBowling).toBe(false);
  });

  it("prefers away bowling when both sides carry figures (result-single bind)", () => {
    const dualBowlingMatch: MatchResult = {
      ...matches[0],
      homeTeam: {
        ...matches[0].homeTeam,
        bowlingPerformances: [
          {
            player: "Home-side bowler",
            overs: 4,
            maidens: 0,
            runs: 20,
            wickets: 2,
            economy: "5.00",
            team: matches[0].homeTeam.name,
          },
        ],
      },
      awayTeam: {
        ...matches[0].awayTeam,
        bowlingPerformances: matches[0].awayTeam.bowlingPerformances,
      },
    };

    const { bowlingRows } = resolveScorelineMatchPerformances(dualBowlingMatch);

    expect(bowlingRows[0]?.kind === "bowling" && bowlingRows[0].player).toBe(
      "Waller",
    );
  });
});
