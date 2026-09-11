import { describe, expect, it } from "vitest";
import { resolveScorelineCanvasDataset } from "./resolveScorelineCanvasDataset";

describe("resolveScorelineCanvasDataset", () => {
  it("maps cricket composition ids to canvas data attributes", () => {
    expect(resolveScorelineCanvasDataset("CricketLadder")).toEqual({
      "data-ladder": "",
    });
    expect(resolveScorelineCanvasDataset("CricketTop5Batting")).toEqual({
      "data-leaderboard": "batting",
    });
    expect(resolveScorelineCanvasDataset("CricketTop5Bowling")).toEqual({
      "data-leaderboard": "bowling",
    });
    expect(resolveScorelineCanvasDataset("CricketBattingPerformances")).toEqual(
      {
        "data-leaderboard": "batting",
      },
    );
    expect(resolveScorelineCanvasDataset("CricketBowlingPerformances")).toEqual(
      {
        "data-leaderboard": "bowling",
      },
    );
    expect(resolveScorelineCanvasDataset("CricketRoster")).toEqual({
      "data-roster": "",
    });
    expect(resolveScorelineCanvasDataset("CricketTeamOfTheWeek")).toEqual({
      "data-totw": "",
    });
    expect(resolveScorelineCanvasDataset("CricketResultSingle")).toEqual({
      "data-result-single": "",
    });
  });

  it("returns an empty dataset for unmapped compositions", () => {
    expect(resolveScorelineCanvasDataset("CricketResults")).toEqual({});
  });
});
