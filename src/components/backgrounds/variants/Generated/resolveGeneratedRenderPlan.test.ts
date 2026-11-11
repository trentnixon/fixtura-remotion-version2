import { describe, expect, it } from "vitest";
import { createColorSystem } from "../../../../core/utils/colorSystem";
import { basicTheme } from "../../../../templates/variants/basic/theme";
import { resolveBackgroundIngress } from "../../backgroundPort";
import { resolveGeneratedRenderPlan } from "./resolveGeneratedRenderPlan";

describe("resolveGeneratedRenderPlan", () => {
  const palette = createColorSystem(
    "#003366",
    "#ffcc00",
    basicTheme.mode.dark,
  ).palettes.primary;

  it("returns pattern plan from generated ingress route", () => {
    const { route } = resolveBackgroundIngress({
      useBackground: "Pattern",
      pattern: { type: "dots" },
    });
    const plan = resolveGeneratedRenderPlan(route, palette);

    expect(plan?.kind).toBe("pattern");
    if (plan?.kind === "pattern") {
      expect(plan.presetId.length).toBeGreaterThan(0);
      expect(plan.adapter.length).toBeGreaterThan(0);
    }
  });

  it("returns noise plan with palette-driven colors", () => {
    const { route } = resolveBackgroundIngress({
      useBackground: "Noise",
      noise: { type: "floatingParticles" },
    });
    const plan = resolveGeneratedRenderPlan(route, palette);

    expect(plan?.kind).toBe("noise");
    if (plan?.kind === "noise") {
      expect(plan.variant).toBe("floatingParticles");
      expect(plan.baseColor).toBe(palette.background.main);
      expect(plan.noiseColor).toBe(palette.background.accent);
    }
  });
});
