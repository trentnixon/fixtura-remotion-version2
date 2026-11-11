import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildResultsLiteSequences,
  countResultsLiteFixtures,
  hasResultsLiteGradeBlocks,
  parseResultsLiteGradeBlocks,
} from "./upstreamResultsLiteData";
import { RESULTS_LITE_PER_SCREEN } from "./resultsLiteConstants";

const samplePath = join(
  process.cwd(),
  "testData/samples/Cricket/Cricket_ResultsLite.json",
);

describe("upstreamResultsLiteData", () => {
  const sample = JSON.parse(readFileSync(samplePath, "utf8"));

  it("consumes grade blocks with nested fixtures from Cricket_ResultsLite.json", () => {
    expect(hasResultsLiteGradeBlocks(sample.data)).toBe(true);
    const blocks = parseResultsLiteGradeBlocks(sample.data);
    expect(blocks).toHaveLength(4);
    expect(countResultsLiteFixtures(blocks)).toBe(35);
  });

  it("starts each upstream grade on a fresh sequence (per-grade pagination)", () => {
    const blocks = parseResultsLiteGradeBlocks(sample.data);
    const sequences = buildResultsLiteSequences(
      blocks,
      RESULTS_LITE_PER_SCREEN,
    );

    // 8→2 screens, 9→3 each for the other grades → 11 sequences (not 9 cross-grade)
    expect(sequences).toHaveLength(11);
    expect(sequences[0]?.fixtures).toHaveLength(4);
    expect(sequences[1]?.fixtures).toHaveLength(4);
    expect(sequences[1]?.showGradeHeader).toBe(true);
    expect(sequences[2]?.showGradeHeader).toBe(true);
    expect(sequences[2]?.gradeName).toContain("Fourths");
  });

  it("paginates 8 fixtures in one grade as two sequences of four", () => {
    const blocks = parseResultsLiteGradeBlocks(sample.data);
    const firstGradeOnly = [blocks[0]];
    const sequences = buildResultsLiteSequences(
      firstGradeOnly,
      RESULTS_LITE_PER_SCREEN,
    );
    expect(sequences).toHaveLength(2);
    expect(sequences[0]?.fixtures).toHaveLength(4);
    expect(sequences[1]?.fixtures).toHaveLength(4);
    expect(sequences[0]?.showGradeHeader).toBe(true);
    expect(sequences[1]?.showGradeHeader).toBe(true);
  });

  it("paginates 10 fixtures in one grade as 4, 4, 2", () => {
    const tenFixtures = Array.from({ length: 10 }, (_, i) => ({
      gameID: `game-${i}`,
      gradeName: "Test Grade",
      homeTeam: { name: "Home", score: "1/1" },
      awayTeam: { name: "Away", score: "2/2" },
      type: "One Day",
    }));
    const sequences = buildResultsLiteSequences(
      [
        {
          grade: { gradeName: "Test Grade" },
          fixtures: tenFixtures,
        },
      ],
      4,
    );
    expect(sequences).toHaveLength(3);
    expect(sequences.map((s) => s.fixtures.length)).toEqual([4, 4, 2]);
    expect(sequences[0]?.showGradeHeader).toBe(true);
    expect(sequences[1]?.showGradeHeader).toBe(true);
    expect(sequences[2]?.showGradeHeader).toBe(true);
  });

  it("reports frame math for sample timings", () => {
    const blocks = parseResultsLiteGradeBlocks(sample.data);
    const sequences = buildResultsLiteSequences(
      blocks,
      RESULTS_LITE_PER_SCREEN,
    );
    const perScreen = sample.timings.FPS_SCORECARD as number;
    const contentFrames = sequences.length * perScreen;
    const fpsMain = sample.timings.FPS_MAIN as number;
    const fpsIntro = sample.timings.FPS_INTRO as number;

    expect(sequences.length).toBe(11);
    expect(contentFrames).toBe(2310);
    expect(fpsMain).toBe(2160);
    expect(fpsIntro + fpsMain).toBe(2250);
    expect(contentFrames).toBeGreaterThan(fpsMain);
  });
});
