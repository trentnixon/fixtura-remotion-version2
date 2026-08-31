import { describe, expect, test } from "vitest";
import {
  buildMotionMotifVariantSeed,
  resolveMotionMotifVariantIndex,
  resolveMotionMotifVariantKey,
} from "./resolveVariantIndex";
import { MOTION_MOTIF_VARIANT_KEYS } from "./variants";

describe("resolveMotionMotifVariantIndex", () => {
  test("returns a stable index for the same seed", () => {
    const seed = buildMotionMotifVariantSeed({
      compositionId: "CricketResults",
      primary: "#1a365d",
      secondary: "#e53e3e",
    });

    expect(resolveMotionMotifVariantIndex(seed)).toBe(
      resolveMotionMotifVariantIndex(seed),
    );
  });

  test("returns a key within the variant registry", () => {
    const key = resolveMotionMotifVariantKey(
      buildMotionMotifVariantSeed({
        compositionId: "CricketResults",
        primary: "#111111",
        secondary: "#ffffff",
      }),
    );

    expect(MOTION_MOTIF_VARIANT_KEYS).toContain(key);
  });

  test("selects both baseline and tiled-field across palette seeds", () => {
    const keys = new Set(
      [
        { compositionId: "CricketResults", primary: "#111111", secondary: "#ffffff" },
        { compositionId: "CricketLadder", primary: "#FF0000", secondary: "#004DE2" },
        { compositionId: "CricketUpcoming", primary: "#002244", secondary: "#FFD700" },
        { compositionId: "CricketRoster", primary: "#003300", secondary: "#CCFFCC" },
      ].map((input) => resolveMotionMotifVariantKey(buildMotionMotifVariantSeed(input))),
    );

    expect(keys.has("baseline")).toBe(true);
    expect(keys.has("tiled-field")).toBe(true);
  });
});
