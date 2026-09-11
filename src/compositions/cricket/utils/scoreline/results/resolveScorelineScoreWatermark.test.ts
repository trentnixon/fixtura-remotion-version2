import { describe, expect, it } from "vitest";
import {
  resolveScorelineScoreWatermark,
  runsFromScore,
} from "./resolveScorelineScoreWatermark";

describe("runsFromScore", () => {
  it("reads runs after the wicket slash", () => {
    expect(runsFromScore("3/118")).toBe("118");
  });

  it("reads the first number when no slash is present", () => {
    expect(runsFromScore("189")).toBe("189");
  });
});

describe("resolveScorelineScoreWatermark", () => {
  it("uses the higher innings total", () => {
    expect(resolveScorelineScoreWatermark("3/118", "4/189")).toBe("189");
  });

  it("returns null when both scores are empty", () => {
    expect(resolveScorelineScoreWatermark("", "")).toBeNull();
  });
});
