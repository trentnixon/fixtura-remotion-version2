import { DEFAULT_COLORS } from "./constants";

/**
 * Get a default color for a specific use case
 * @param colorKey The key for the desired color type
 * @returns The default color for that type
 */
export const getDefaultColor = (
  colorKey: keyof typeof DEFAULT_COLORS,
): string => {
  return DEFAULT_COLORS[colorKey];
};

/**
 * Get a fallback color if provided color is invalid
 * @param color The color to validate
 * @param fallbackKey The key for the desired fallback color
 * @returns The original color if valid, otherwise the fallback color
 */
export const getValidColorOrFallback = (
  color: string | undefined | null,
  fallbackKey: keyof typeof DEFAULT_COLORS = "PRIMARY",
): string => {
  if (!color) {
    return DEFAULT_COLORS[fallbackKey];
  }

  // Basic validation - check if it looks like a color
  const isHex = /^#([A-Fa-f0-9]{3}){1,2}$/.test(color);
  const isRgb = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color);
  const isRgba = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/.test(
    color,
  );
  const isColorName = /^[a-zA-Z]+$/.test(color);

  return isHex || isRgb || isRgba || isColorName
    ? color
    : DEFAULT_COLORS[fallbackKey];
};

/**
 * Default palette presets for common themes
 */
export const DEFAULT_PALETTE_PRESETS = {
  blue: {
    primary: "#1a73e8",
    secondary: "#34a853",
  },
  red: {
    primary: "#ea4335",
    secondary: "#fbbc04",
  },
  green: {
    primary: "#34a853",
    secondary: "#4285f4",
  },
  purple: {
    primary: "#673ab7",
    secondary: "#ff4081",
  },
  orange: {
    primary: "#ff9800",
    secondary: "#2196f3",
  },
  dark: {
    primary: "#121212",
    secondary: "#bb86fc",
  },
  light: {
    primary: "#f8f9fa",
    secondary: "#1a73e8",
  },
};

/**
 * Get a predefined color palette preset
 * @param presetName The name of the desired preset
 * @returns Object with primary and secondary colors
 */
export const getPalettePreset = (
  presetName: keyof typeof DEFAULT_PALETTE_PRESETS,
): { primary: string; secondary: string } => {
  return DEFAULT_PALETTE_PRESETS[presetName] || DEFAULT_PALETTE_PRESETS.blue;
};
