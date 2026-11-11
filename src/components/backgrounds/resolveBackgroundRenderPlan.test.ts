import { describe, expect, it } from "vitest";
import { createColorSystem } from "../../core/utils/colorSystem";
import { basicTheme } from "../../templates/variants/basic/theme";
import { resolveBackgroundRenderPlan } from "./resolveBackgroundRenderPlan";

describe("resolveBackgroundRenderPlan", () => {
  const palette = createColorSystem(
    "#003366",
    "#ffcc00",
    basicTheme.mode.dark,
  ).palettes.primary;

  it("passes through solid ingress without luminance plan", () => {
    const plan = resolveBackgroundRenderPlan({
      wire: { useBackground: "Solid" },
      palette,
    });

    expect(plan.route.kind).toBe("solid");
    expect(plan.luminance).toBeUndefined();
    expect(plan.ingress.legacyUseBackgroundForCompositionId).toBe("Solid");
  });

  it("attaches luminance render plan when route is luminance", () => {
    const plan = resolveBackgroundRenderPlan({
      wire: {
        useBackground: "Luminance",
        luminance: {
          asset: "smooth-ramp.png",
          map: { kind: "theme", preset: "brand" },
        },
      },
      palette,
    });

    expect(plan.route.kind).toBe("luminance");
    expect(plan.luminance?.mode).toBe("mapped");
  });

  it("maps Pattern wire to generated route via ingress", () => {
    const plan = resolveBackgroundRenderPlan({
      wire: { useBackground: "Pattern", pattern: { type: "dots" } },
    });

    expect(plan.ingress.match.outcome).toBe("generated");
    expect(plan.route.kind).toBe("pattern");
    expect(plan.generated?.kind).toBe("pattern");
  });
});
