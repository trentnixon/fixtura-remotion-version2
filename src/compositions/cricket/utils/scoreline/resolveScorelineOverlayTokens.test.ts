import tinycolor from "tinycolor2";
import { describe, expect, it } from "vitest";
import { createColorSystem } from "../../../../core/utils/colorSystem";
import { scorelineMode } from "../../../../templates/variants/scoreline/theme/mode";
import {
  isScorelineDarkContainerMode,
  resolveScorelineContainerCopyTokens,
  resolveScorelineMatchContextTokens,
  resolveScorelineModeSurfaceVars,
  resolveScorelineLadderRowSurface,
  resolveScorelinePerformanceAreaSurface,
  resolveScorelineRosterRowSurface,
} from "./resolveScorelineOverlayTokens";

const paletteForMode = (mode: keyof typeof scorelineMode) =>
  createColorSystem("#004de2", "#e8c547", scorelineMode[mode]).palettes.primary;

describe("resolveScorelineMatchContextTokens", () => {
  it("uses a light panel and dark copy for light mode", () => {
    const tokens = resolveScorelineMatchContextTokens(paletteForMode("light"));

    expect(tokens.surface).toContain("243, 240, 234");
    expect(tinycolor(tokens.text).isDark()).toBe(true);
  });

  it("uses the same light panel and dark copy for lightAlt mode", () => {
    const tokens = resolveScorelineMatchContextTokens(
      paletteForMode("lightAlt"),
    );

    expect(tokens.surface).toContain("243, 240, 234");
    expect(tinycolor(tokens.text).isDark()).toBe(true);
  });

  it("uses a dark panel and light copy for dark mode", () => {
    const tokens = resolveScorelineMatchContextTokens(paletteForMode("dark"));

    expect(tokens.surface).toContain("8, 11, 13");
    expect(tinycolor(tokens.text).isLight()).toBe(true);
  });

  it("uses the same dark panel and light copy for darkAlt mode", () => {
    const tokens = resolveScorelineMatchContextTokens(
      paletteForMode("darkAlt"),
    );

    expect(tokens.surface).toContain("8, 11, 13");
    expect(tinycolor(tokens.text).isLight()).toBe(true);
  });
});

describe("resolveScorelineContainerCopyTokens", () => {
  it("uses a 40% minimum panel tint", () => {
    expect(
      resolveScorelineContainerCopyTokens(paletteForMode("light")).surface,
    ).toBe("rgba(243, 240, 234, 0.4)");
    expect(
      resolveScorelineContainerCopyTokens(paletteForMode("dark")).surface,
    ).toBe("rgba(8, 11, 13, 0.4)");
  });

  it("maps Alt modes to the same container family as their base mode", () => {
    const light = resolveScorelineContainerCopyTokens(paletteForMode("light"));
    const lightAlt = resolveScorelineContainerCopyTokens(
      paletteForMode("lightAlt"),
    );
    const dark = resolveScorelineContainerCopyTokens(paletteForMode("dark"));
    const darkAlt = resolveScorelineContainerCopyTokens(
      paletteForMode("darkAlt"),
    );

    expect(light.surface).toBe(lightAlt.surface);
    expect(light.text).toBe(lightAlt.text);
    expect(dark.surface).toBe(darkAlt.surface);
    expect(dark.text).toBe(darkAlt.text);
  });
});

describe("isScorelineDarkContainerMode", () => {
  it("treats light modes as light containers and dark modes as dark containers", () => {
    expect(isScorelineDarkContainerMode(paletteForMode("light"))).toBe(false);
    expect(isScorelineDarkContainerMode(paletteForMode("lightAlt"))).toBe(
      false,
    );
    expect(isScorelineDarkContainerMode(paletteForMode("dark"))).toBe(true);
    expect(isScorelineDarkContainerMode(paletteForMode("darkAlt"))).toBe(true);
  });
});

describe("resolveScorelinePerformanceAreaSurface", () => {
  it("uses a 50% tint for results performance panels", () => {
    expect(
      resolveScorelinePerformanceAreaSurface(paletteForMode("light")),
    ).toBe("rgba(243, 240, 234, 0.5)");
    expect(resolveScorelinePerformanceAreaSurface(paletteForMode("dark"))).toBe(
      "rgba(8, 11, 13, 0.5)",
    );
  });
});

describe("resolveScorelineLadderRowSurface", () => {
  it("uses a 50% tint for ladder row containers", () => {
    expect(resolveScorelineLadderRowSurface(paletteForMode("light"))).toBe(
      "rgba(243, 240, 234, 0.5)",
    );
    expect(resolveScorelineLadderRowSurface(paletteForMode("dark"))).toBe(
      "rgba(8, 11, 13, 0.5)",
    );
  });
});

describe("resolveScorelineRosterRowSurface", () => {
  it("uses a 75% tint for roster player row containers", () => {
    expect(resolveScorelineRosterRowSurface(paletteForMode("light"))).toBe(
      "rgba(243, 240, 234, 0.75)",
    );
    expect(resolveScorelineRosterRowSurface(paletteForMode("dark"))).toBe(
      "rgba(8, 11, 13, 0.75)",
    );
  });
});

describe("resolveScorelineModeSurfaceVars", () => {
  it("keeps the overlay transparent in light modes and maps panels to backgroundAlt", () => {
    const surfaces = resolveScorelineModeSurfaceVars(paletteForMode("light"));

    expect(surfaces.containerBackground).toBe("transparent");
    expect(surfaces.surfaceMuted).toBe("#f3f0ea");
    expect(surfaces.surface).toBe("#ffffff");
  });

  it("maps dark mode containers to panel surfaces without painting the canvas", () => {
    const surfaces = resolveScorelineModeSurfaceVars(paletteForMode("dark"));

    expect(surfaces.containerBackground).toBe("#080b0d");
    expect(surfaces.surfaceMuted).toBe("#1a1a1a");
    expect(surfaces.surface).toBe("#080b0d");
  });
});
