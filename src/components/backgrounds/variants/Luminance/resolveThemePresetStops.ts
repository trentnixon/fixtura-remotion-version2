import tinycolor from "tinycolor2";
import type { DesignPalette } from "../../../../core/utils/designPalettes/types";
import type { LuminanceStop, LuminanceThemePreset } from "./types";

const MIN_LIGHTNESS_SPREAD = 0.12;

export const measurePaletteLightnessSpread = (colors: string[]): number => {
  const values = colors
    .map((color) => tinycolor(color).toHsl().l)
    .filter((value) => Number.isFinite(value));

  if (values.length === 0) {
    return 0;
  }

  return Math.max(...values) - Math.min(...values);
};

export const paletteNeedsTonalFallback = (palette: DesignPalette): boolean => {
  const spread = measurePaletteLightnessSpread([
    palette.background.dark,
    palette.background.primary,
    palette.background.accent,
  ]);

  return spread < MIN_LIGHTNESS_SPREAD;
};

export const resolveThemePresetStops = (
  palette: DesignPalette,
  preset: LuminanceThemePreset,
  options?: { forceTonal?: boolean },
): LuminanceStop[] => {
  if (preset === "protected-brand") {
    // Stops are not used for protected-brand; resolveProtectedBrandSegments owns that path.
    return [
      { position: 0, color: "#000000" },
      { position: 0.5, color: palette.background.primary },
      { position: 1, color: "#FFFFFF" },
    ];
  }

  const useTonal =
    options?.forceTonal ||
    preset === "tonal-brand" ||
    paletteNeedsTonalFallback(palette);

  if (useTonal) {
    return [
      { position: 0, color: palette.background.dark },
      { position: 0.45, color: palette.background.primary },
      { position: 1, color: palette.background.light },
    ];
  }

  if (preset === "brand-with-accent") {
    return [
      { position: 0, color: palette.background.dark },
      { position: 0.55, color: palette.background.primary },
      { position: 1, color: palette.background.accent },
    ];
  }

  return [
    { position: 0, color: palette.background.dark },
    { position: 0.65, color: palette.background.primary },
    { position: 1, color: palette.background.accent },
  ];
};
