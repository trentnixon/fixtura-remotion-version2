import { describe, expect, it } from "vitest";
import { createColorSystem } from "../../../../core/utils/colorSystem";
import { basicTheme } from "../../../../templates/variants/basic/theme";
import { resolveLuminanceMap } from "./resolveLuminanceMap";

describe("resolveLuminanceMap color system integration", () => {
  it("resolves theme brand preset from createColorSystem palette", () => {
    const colorSystem = createColorSystem(
      "#003366",
      "#ffcc00",
      basicTheme.mode.dark,
    );
    const palette = colorSystem.palettes.primary;

    const result = resolveLuminanceMap({
      palette,
      config: { kind: "theme", preset: "brand" },
    });

    expect(result.lut.r).toHaveLength(256);
    expect(result.lut.r[0]).toBeGreaterThanOrEqual(0);
    expect(result.lut.r[255]).toBeGreaterThanOrEqual(0);
  });
});
