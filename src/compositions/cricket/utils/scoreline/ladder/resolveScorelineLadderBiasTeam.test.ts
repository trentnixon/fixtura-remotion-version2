import { describe, expect, it } from "vitest";
import { resolveScorelineLadderBiasTeam } from "./resolveScorelineLadderBiasTeam";

describe("resolveScorelineLadderBiasTeam", () => {
  it("matches explicit bias team name", () => {
    expect(
      resolveScorelineLadderBiasTeam(
        "Queens 1st Grade",
        "Queens 1st Grade",
        "",
      ),
    ).toBe(true);
  });

  it("falls back to club focus when bias is empty", () => {
    expect(
      resolveScorelineLadderBiasTeam(
        "Sunshine Coast Premier",
        null,
        "Sunshine Coast Cricket Club",
      ),
    ).toBe(true);
  });

  it("returns false when bias is empty and team does not match club focus", () => {
    expect(
      resolveScorelineLadderBiasTeam(
        "Queens 1st Grade",
        null,
        "Sunshine Coast Cricket Club",
      ),
    ).toBe(false);
  });

  it("returns false when club focus is too short", () => {
    expect(resolveScorelineLadderBiasTeam("AB Team", null, "AB Club")).toBe(
      false,
    );
  });
});
