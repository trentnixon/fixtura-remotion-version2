import { describe, expect, test } from "vitest";
import {
  buildTopographicFlowVariantSeed,
  resolveTopographicFlowVariantIndex,
  resolveTopographicFlowVariantKey,
} from "./resolveVariantIndex";
import { TOPOGRAPHIC_FLOW_VARIANT_KEYS } from "./variants";

describe("resolveTopographicFlowVariantIndex", () => {
  test("returns a stable index for the same seed", () => {
    const seed = buildTopographicFlowVariantSeed({
      compositionId: "CricketResults",
      primary: "#1a365d",
      secondary: "#e53e3e",
    });

    expect(resolveTopographicFlowVariantIndex(seed)).toBe(
      resolveTopographicFlowVariantIndex(seed),
    );
  });

  test("returns a key within the variant registry", () => {
    const key = resolveTopographicFlowVariantKey(
      buildTopographicFlowVariantSeed({
        compositionId: "CricketResults",
        primary: "#111111",
        secondary: "#ffffff",
      }),
    );

    expect(TOPOGRAPHIC_FLOW_VARIANT_KEYS).toContain(key);
  });
});
