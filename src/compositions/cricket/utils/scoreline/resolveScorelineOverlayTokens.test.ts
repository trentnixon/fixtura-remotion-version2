import tinycolor from "tinycolor2";
import { describe, expect, it } from "vitest";
import { createColorSystem } from "../../../../core/utils/colorSystem";
import { scorelineMode } from "../../../../templates/variants/scoreline/theme/mode";
import { resolveScorelineMatchContextTokens } from "./resolveScorelineOverlayTokens";

const paletteForMode = (mode: keyof typeof scorelineMode) =>
  createColorSystem("#004de2", "#e8c547", scorelineMode[mode]).palettes
    .primary;

describe("resolveScorelineMatchContextTokens", () => {
  it("uses a light panel and dark copy for light mode", () => {
    const tokens = resolveScorelineMatchContextTokens(paletteForMode("light"));

    expect(tokens.surface).toContain("243, 240, 234");
    expect(tinycolor(tokens.text).isDark()).toBe(true);
  });

  it("uses a dark panel and light copy for lightAlt mode", () => {
    const tokens = resolveScorelineMatchContextTokens(
      paletteForMode("lightAlt"),
    );

    expect(tokens.surface).toContain("8, 11, 13");
    expect(tinycolor(tokens.text).isLight()).toBe(true);
  });

  it("uses a dark panel and light copy for dark mode", () => {
    const tokens = resolveScorelineMatchContextTokens(paletteForMode("dark"));

    expect(tokens.surface).toContain("8, 11, 13");
    expect(tinycolor(tokens.text).isLight()).toBe(true);
  });

  it("uses a light panel and dark copy for darkAlt mode", () => {
    const tokens = resolveScorelineMatchContextTokens(
      paletteForMode("darkAlt"),
    );

    expect(tokens.surface).toContain("243, 240, 234");
    expect(tinycolor(tokens.text).isDark()).toBe(true);
  });
});
