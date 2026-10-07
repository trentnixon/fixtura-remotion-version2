import { describe, expect, it } from "vitest";
import {
  resolveScorelineLadderDensity,
  resolveScorelineLadderShowCreases,
  resolveScorelineLadderShowRowCrease,
  resolveScorelineLadderTeamFont,
  SCORELINE_LADDER_CREASE_MAX_ROWS,
} from "./resolveScorelineLadderLayout";

describe("resolveScorelineLadderLayout", () => {
  it("enlarges team names for short ladders", () => {
    expect(resolveScorelineLadderTeamFont(4)).toEqual({
      teamSize: 36,
      heroSize: 40,
    });
    expect(resolveScorelineLadderTeamFont(6)).toEqual({
      teamSize: 32,
      heroSize: 36,
    });
    expect(resolveScorelineLadderTeamFont(8)).toEqual({
      teamSize: 28,
      heroSize: 32,
    });
    expect(resolveScorelineLadderTeamFont(10)).toEqual({
      teamSize: 24,
      heroSize: 27,
    });
  });

  it("leaves 11+ row ladders on the CSS density scale", () => {
    expect(resolveScorelineLadderTeamFont(11)).toBeUndefined();
    expect(resolveScorelineLadderTeamFont(14)).toBeUndefined();
    expect(resolveScorelineLadderTeamFont(0)).toBeUndefined();
  });

  it("uses normal density up to 11 rows", () => {
    expect(resolveScorelineLadderDensity(11)).toBe("normal");
  });

  it("uses compact density for 12–14 rows", () => {
    expect(resolveScorelineLadderDensity(12)).toBe("compact");
    expect(resolveScorelineLadderDensity(14)).toBe("compact");
  });

  it("uses tight density for 15+ rows", () => {
    expect(resolveScorelineLadderDensity(15)).toBe("tight");
  });

  it("shows creases only up to the row limit", () => {
    expect(resolveScorelineLadderShowCreases(12)).toBe(true);
    expect(resolveScorelineLadderShowCreases(13)).toBe(false);
    expect(SCORELINE_LADDER_CREASE_MAX_ROWS).toBe(12);
  });

  it("omits crease on the last row when creases are enabled", () => {
    expect(resolveScorelineLadderShowRowCrease(8, 6)).toBe(true);
    expect(resolveScorelineLadderShowRowCrease(8, 7)).toBe(false);
  });

  it("omits all creases when row count exceeds the limit", () => {
    expect(resolveScorelineLadderShowRowCrease(13, 0)).toBe(false);
    expect(resolveScorelineLadderShowRowCrease(13, 12)).toBe(false);
  });
});
