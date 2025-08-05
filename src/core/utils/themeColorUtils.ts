// src/core/utils/themeColorUtils.ts

import { DesignPalette } from "../context/StyleContext";

/**
 * Helper functions for working with theme colors
 */

/**
 * Gets a color from the palette with fallback options
 * Looks through multiple palette sections for the requested color
 *
 * @param palette The entire theme palette object
 * @param colorKey The color key to look for
 * @param fallback Fallback color if not found
 * @param section Optional section to look in first
 * @returns The color value
 */
export function getPaletteColor(
  palette: DesignPalette,
  colorKey: string,
  fallback: string = "#000000",
  section?: string,
): string {
  if (!palette) {
    return fallback;
  }

  // Try section-specific lookup first if provided
  if (
    section &&
    (palette as unknown as Record<string, unknown>)[section] &&
    (palette as unknown as Record<string, Record<string, unknown>>)[section][
      colorKey
    ]
  ) {
    return (palette as unknown as Record<string, Record<string, unknown>>)[
      section
    ][colorKey] as string;
  }

  // Try primary keys first
  if ((palette as unknown as Record<string, unknown>)[colorKey]) {
    return (palette as unknown as Record<string, unknown>)[colorKey] as string;
  }

  // Check background section
  if (
    palette.background &&
    (palette.background as unknown as Record<string, unknown>)[colorKey]
  ) {
    return (palette.background as unknown as Record<string, unknown>)[
      colorKey
    ] as string;
  }

  // Check container section
  if (
    palette.container &&
    (palette.container as unknown as Record<string, unknown>)[colorKey]
  ) {
    return (palette.container as unknown as Record<string, unknown>)[
      colorKey
    ] as string;
  }

  // Check text section
  if (palette.text) {
    // Check onBackground section
    if (
      palette.text.onBackground &&
      (palette.text.onBackground as unknown as Record<string, unknown>)[
        colorKey
      ]
    ) {
      return (palette.text.onBackground as unknown as Record<string, unknown>)[
        colorKey
      ] as string;
    }

    // Check onContainer section
    if (
      palette.text.onContainer &&
      (palette.text.onContainer as unknown as Record<string, unknown>)[colorKey]
    ) {
      return (palette.text.onContainer as unknown as Record<string, unknown>)[
        colorKey
      ] as string;
    }
  }

  return fallback;
}

/**
 * Gets a color with specified opacity
 *
 * @param color The base color (hex, rgb, rgba)
 * @param opacity The opacity value (0-1)
 * @returns RGBA color string
 */
export function getColorWithOpacity(color: string, opacity: number): string {
  // If already rgba, modify the opacity
  if (color.startsWith("rgba")) {
    return color.replace(/rgba\((.+),\s*[\d.]+\)/, `rgba($1, ${opacity})`);
  }

  // If rgb, convert to rgba
  if (color.startsWith("rgb")) {
    return color.replace(/rgb\((.+)\)/, `rgba($1, ${opacity})`);
  }

  // If hex, convert to rgba
  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // If named color or unknown format, return as is
  return color;
}

/**
 * Gets a gradient from the palette
 *
 * @param palette The theme palette
 * @param gradientKey The gradient key
 * @param direction The gradient direction
 * @param fallback Fallback gradient
 * @returns CSS gradient string
 */

/**
 * Gets a shadow from the theme
 *
 * @param palette The theme palette
 * @param shadowKey The shadow key
 * @param fallback Fallback shadow
 * @returns CSS shadow string
 */

/**
 * Lightens a color by the specified amount
 *
 * @param color The base color (hex)
 * @param amount Amount to lighten (0-1)
 * @returns Lightened color
 */
export function lightenColor(color: string, amount: number): string {
  // Only works with hex colors
  if (!color.startsWith("#")) {
    return color;
  }

  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  r = Math.min(255, Math.round(r + (255 - r) * amount));
  g = Math.min(255, Math.round(g + (255 - g) * amount));
  b = Math.min(255, Math.round(b + (255 - b) * amount));

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/**
 * Darkens a color by the specified amount
 *
 * @param color The base color (hex)
 * @param amount Amount to darken (0-1)
 * @returns Darkened color
 */
export function darkenColor(color: string, amount: number): string {
  // Only works with hex colors
  if (!color.startsWith("#")) {
    return color;
  }

  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  r = Math.max(0, Math.round(r * (1 - amount)));
  g = Math.max(0, Math.round(g * (1 - amount)));
  b = Math.max(0, Math.round(b * (1 - amount)));

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export default {
  getPaletteColor,
  getColorWithOpacity,
  /* getPaletteGradient,
  getPaletteShadow, */
  lightenColor,
  darkenColor,
};
