import { describe, expect, it } from "vitest";
import {
  parseDesignCanvasDataAttrNames,
  verifyCanvasDatasetContract,
} from "./canvasDatasetContract";

const ladderCanvas = `<div class="design-social-canvas scoreline-canvas" data-ladder data-sponsor-state="placeholder">`;

describe("canvasDatasetContract", () => {
  it("parses canvas root data-* names", () => {
    expect(parseDesignCanvasDataAttrNames(ladderCanvas)).toEqual(
      new Set(["data-ladder", "data-sponsor-state"]),
    );
  });

  it("passes when overlay dataset attrs match CricketLadder", () => {
    expect(verifyCanvasDatasetContract(ladderCanvas, "CricketLadder")).toEqual(
      [],
    );
  });

  it("requires leaderboard batting/bowling values", () => {
    const batting = `<div class="template-canvas night-session-canvas" data-leaderboard="batting">`;
  const bowling = `<div class="template-canvas" data-leaderboard="bowling">`;
    expect(
      verifyCanvasDatasetContract(batting, "CricketTop5Batting"),
    ).toEqual([]);
    expect(
      verifyCanvasDatasetContract(bowling, "CricketTop5Bowling"),
    ).toEqual([]);
    expect(
      verifyCanvasDatasetContract(batting, "CricketTop5Bowling"),
    ).not.toEqual([]);
  });
});
