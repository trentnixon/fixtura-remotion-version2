import { describe, expect, test } from "vitest";
import {
  buildSignalGridVariantSeed,
  resolveSignalGridVariantIndex,
  resolveSignalGridVariantKey,
} from "./resolveVariantIndex";
import { SIGNAL_GRID_VARIANT_KEYS } from "./variants";

describe("resolveSignalGridVariantIndex", () => {
  test("returns a stable index for the same seed", () => {
    const seed = buildSignalGridVariantSeed({
      compositionId: "CricketResults",
      primary: "#1a365d",
      secondary: "#e53e3e",
    });

    expect(resolveSignalGridVariantIndex(seed)).toBe(
      resolveSignalGridVariantIndex(seed),
    );
  });

  test("returns a key within the variant registry", () => {
    const key = resolveSignalGridVariantKey(
      buildSignalGridVariantSeed({
        compositionId: "CricketResults",
        primary: "#111111",
        secondary: "#ffffff",
      }),
    );

    expect(SIGNAL_GRID_VARIANT_KEYS).toContain(key);
  });

  test("selects both floor directions across palette seeds", () => {
    const keys = new Set(
      [
        {
          compositionId: "CricketResults",
          primary: "#111111",
          secondary: "#ffffff",
        },
        {
          compositionId: "CricketLadder",
          primary: "#FF0000",
          secondary: "#004DE2",
        },
        {
          compositionId: "CricketUpcoming",
          primary: "#002244",
          secondary: "#FFD700",
        },
        {
          compositionId: "CricketRoster",
          primary: "#003300",
          secondary: "#CCFFCC",
        },
      ].map((input) =>
        resolveSignalGridVariantKey(buildSignalGridVariantSeed(input)),
      ),
    );

    expect(keys.has("floor")).toBe(true);
    expect(keys.has("floor-inverted")).toBe(true);
  });
});
