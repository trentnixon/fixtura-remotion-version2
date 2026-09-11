import { describe, expect, it } from "vitest";
import { resolveScorelineHeaderDefaults } from "./resolveScorelineHeaderDefaults";

describe("resolveScorelineHeaderDefaults", () => {
  it("returns upcoming defaults for CricketUpcoming", () => {
    expect(resolveScorelineHeaderDefaults("CricketUpcoming")).toEqual({
      eyebrow: "Upcoming",
      title: "Upcoming Fixtures",
    });
  });

  it("falls back to results defaults for unknown compositions", () => {
    expect(resolveScorelineHeaderDefaults(undefined)).toEqual({
      eyebrow: "Results",
      title: "Weekend Results",
    });
  });
});
