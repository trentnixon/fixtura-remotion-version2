import { describe, expect, it } from "vitest";
import { resolveOverlayCanvasDataset } from "./canvasDataset";

describe("resolveOverlayCanvasDataset", () => {
  it("maps cricket composition ids to canvas data attributes", () => {
    expect(resolveOverlayCanvasDataset("CricketLadder")).toEqual({
      "data-ladder": "",
    });
    expect(resolveOverlayCanvasDataset("CricketTop5Batting")).toEqual({
      "data-leaderboard": "batting",
    });
    expect(resolveOverlayCanvasDataset("CricketTop5Bowling")).toEqual({
      "data-leaderboard": "bowling",
    });
    expect(resolveOverlayCanvasDataset("CricketBattingPerformances")).toEqual({
      "data-leaderboard": "batting",
    });
    expect(resolveOverlayCanvasDataset("CricketBowlingPerformances")).toEqual({
      "data-leaderboard": "bowling",
    });
    expect(resolveOverlayCanvasDataset("CricketRoster")).toEqual({
      "data-roster": "",
    });
    expect(resolveOverlayCanvasDataset("CricketTeamOfTheWeek")).toEqual({
      "data-totw": "",
    });
    expect(resolveOverlayCanvasDataset("CricketResultSingle")).toEqual({
      "data-result-single": "",
    });
    expect(resolveOverlayCanvasDataset("CricketUpcoming")).toEqual({
      "data-upcoming": "",
    });
  });

  it("returns an empty dataset for unmapped compositions", () => {
    expect(resolveOverlayCanvasDataset("CricketResults")).toEqual({});
  });
});
