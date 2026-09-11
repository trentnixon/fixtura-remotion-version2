import { describe, expect, it } from "vitest";
import {
  resolveScorelineLadderDensity,
  resolveScorelineLadderShowCreases,
  resolveScorelineLadderShowRowCrease,
  SCORELINE_LADDER_CREASE_MAX_ROWS,
} from "./resolveScorelineLadderLayout";

describe("resolveScorelineLadderLayout", () => {
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
