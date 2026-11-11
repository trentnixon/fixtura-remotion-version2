import { describe, expect, it } from "vitest";
import { createColorSystem } from "../../../../core/utils/colorSystem";
import { basicTheme } from "../../../../templates/variants/basic/theme";
import { resolveLuminanceRenderPlan } from "./resolveLuminanceRenderPlan";

describe("resolveLuminanceRenderPlan", () => {
  const palette = createColorSystem(
    "#003366",
    "#ffcc00",
    basicTheme.mode.dark,
  ).palettes.primary;

  it("returns fallback when asset and map cannot render", () => {
    const plan = resolveLuminanceRenderPlan({
      templateLuminance: {
        map: { kind: "theme", preset: "brand" },
      },
      palette,
    });

    expect(plan.mode).toBe("fallback");
    if (plan.mode === "fallback") {
      expect(plan.fallbackBackground.length).toBeGreaterThan(0);
      expect(plan.protectionPreset).toBe("none");
    }
  });

  it("returns mapped plan when public asset key resolves", () => {
    const plan = resolveLuminanceRenderPlan({
      templateLuminance: {
        asset: "smooth-ramp.png",
        map: { kind: "theme", preset: "brand" },
        protection: "uniform",
      },
      palette,
      backend: "svg",
    });

    expect(plan.mode).toBe("mapped");
    if (plan.mode === "mapped") {
      expect(plan.assetSrc).toContain("smooth-ramp.png");
      expect(plan.lut.r).toHaveLength(256);
      expect(plan.backend).toBe("svg");
      expect(plan.protectionPreset).toBe("uniform");
    }
  });
});
