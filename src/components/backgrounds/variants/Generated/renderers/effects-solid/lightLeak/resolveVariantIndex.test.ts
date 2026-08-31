import { describe, expect, test } from "vitest";
import {
  buildLightLeakVariantSeed,
  resolveLightLeakVariantIndex,
  resolveLightLeakVariantKey,
} from "./resolveVariantIndex";
import { LIGHT_LEAK_VARIANT_KEYS } from "./variants";

describe("resolveLightLeakVariantIndex", () => {
  test("returns a stable index for the same seed", () => {
    const seed = buildLightLeakVariantSeed({
      compositionId: "CricketResults",
      primary: "#1a365d",
      secondary: "#e53e3e",
    });

    expect(resolveLightLeakVariantIndex(seed)).toBe(
      resolveLightLeakVariantIndex(seed),
    );
  });

  test("returns a key within the variant registry", () => {
    const key = resolveLightLeakVariantKey(
      buildLightLeakVariantSeed({
        compositionId: "CricketResults",
        primary: "#111111",
        secondary: "#ffffff",
      }),
    );

    expect(LIGHT_LEAK_VARIANT_KEYS).toContain(key);
  });

  test("builds a deterministic seed from composition and palette roles", () => {
    expect(
      buildLightLeakVariantSeed({
        compositionId: "CricketResults",
        primary: "#111111",
        secondary: "#ffffff",
      }),
    ).toBe("CricketResults|#111111|#ffffff");
  });
});
