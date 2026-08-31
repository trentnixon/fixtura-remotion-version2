import { describe, expect, test } from "vitest";
import {
  buildReactivePathVariantSeed,
  resolveReactivePathVariantIndex,
  resolveReactivePathVariantKey,
} from "./resolveVariantIndex";
import { REACTIVE_PATH_VARIANT_KEYS } from "./variants";

describe("resolveReactivePathVariantIndex", () => {
  test("returns a stable index for the same seed", () => {
    const seed = buildReactivePathVariantSeed({
      compositionId: "CricketResults",
      primary: "#1a365d",
      secondary: "#e53e3e",
    });

    expect(resolveReactivePathVariantIndex(seed)).toBe(
      resolveReactivePathVariantIndex(seed),
    );
  });

  test("returns a key within the variant registry", () => {
    const key = resolveReactivePathVariantKey(
      buildReactivePathVariantSeed({
        compositionId: "CricketResults",
        primary: "#111111",
        secondary: "#ffffff",
      }),
    );

    expect(REACTIVE_PATH_VARIANT_KEYS).toContain(key);
  });

  test("selects both orbits and hits across palette seeds", () => {
    const keys = new Set(
      [
        { compositionId: "CricketResults", primary: "#111111", secondary: "#ffffff" },
        { compositionId: "CricketLadder", primary: "#FF0000", secondary: "#004DE2" },
        { compositionId: "CricketUpcoming", primary: "#002244", secondary: "#FFD700" },
        { compositionId: "CricketRoster", primary: "#003300", secondary: "#CCFFCC" },
      ].map((input) =>
        resolveReactivePathVariantKey(buildReactivePathVariantSeed(input)),
      ),
    );

    expect(keys.has("orbits")).toBe(true);
    expect(keys.has("hits")).toBe(true);
  });
});
