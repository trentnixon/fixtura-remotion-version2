import { ColorVariations } from "../core/types";
import {
  getContrastColor,
  lightenColor,
  darkenColor,
  setOpacity,
  saturateOrDesaturateColor,
} from "../core/baseManipulation";
import { COLOR_AMOUNTS } from "../config/constants";

/**
 * Generates comprehensive color variations for a base color
 * @param color The base color
 * @returns Object with color variations
 */
export const generateColorVariations = (color: string): ColorVariations => {
  const contrastText = getContrastColor(color);

  return {
    base: color,
    light: lightenColor(color, COLOR_AMOUNTS.LIGHTEN_SMALL),
    lighter: lightenColor(color, COLOR_AMOUNTS.LIGHTEN_MEDIUM),
    lightest: lightenColor(color, COLOR_AMOUNTS.LIGHTEN_LARGE),
    dark: darkenColor(color, COLOR_AMOUNTS.DARKEN_SMALL),
    darker: darkenColor(color, COLOR_AMOUNTS.DARKEN_MEDIUM),
    darkest: darkenColor(color, COLOR_AMOUNTS.DARKEN_LARGE),
    transparent: setOpacity(color, COLOR_AMOUNTS.OPACITY_MEDIUM),
    semiTransparent: setOpacity(color, COLOR_AMOUNTS.OPACITY_LOW),
    contrastText,
    saturated: saturateOrDesaturateColor(color, COLOR_AMOUNTS.SATURATE),
    desaturated: saturateOrDesaturateColor(color, COLOR_AMOUNTS.DESATURATE),
    muted: setOpacity(
      saturateOrDesaturateColor(color, COLOR_AMOUNTS.DESATURATE / 2),
      COLOR_AMOUNTS.OPACITY_HIGH,
    ),
    accent: saturateOrDesaturateColor(
      lightenColor(color, 5),
      COLOR_AMOUNTS.SATURATE,
    ),
  };
};

/**
 * Generates a palette of related colors from a base color
 * @param color The base color
 * @param steps Number of steps to generate (odd number recommended)
 * @returns Array of related colors
 */
export const generateColorScale = (
  color: string,
  steps: number = 9,
): string[] => {
  const result: string[] = [];
  const middleIndex = Math.floor(steps / 2);

  // Add the base color at the middle index
  for (let i = 0; i < steps; i++) {
    if (i === middleIndex) {
      result.push(color);
    } else if (i < middleIndex) {
      // Lighter colors
      const amount =
        (COLOR_AMOUNTS.LIGHTEN_LARGE * (middleIndex - i)) / middleIndex;
      result.push(lightenColor(color, amount));
    } else {
      // Darker colors
      const amount =
        (COLOR_AMOUNTS.DARKEN_LARGE * (i - middleIndex)) /
        (steps - middleIndex - 1);
      result.push(darkenColor(color, amount));
    }
  }

  return result;
};

/**
 * Generates variations specific to text usage
 * @param color The base text color
 * @returns Object with text-specific variations
 */
export const generateTextVariations = (color: string) => {
  return {
    base: color,
    muted: setOpacity(color, COLOR_AMOUNTS.OPACITY_MEDIUM),
    subtle: setOpacity(color, COLOR_AMOUNTS.OPACITY_LOW),
    highlight: saturateOrDesaturateColor(
      lightenColor(color, 5),
      COLOR_AMOUNTS.SATURATE,
    ),
    link: saturateOrDesaturateColor(color, COLOR_AMOUNTS.SATURATE),
    visited: saturateOrDesaturateColor(darkenColor(color, 10), -10),
    disabled: setOpacity(color, COLOR_AMOUNTS.OPACITY_LOW),
  };
};

/**
 * Generates variations specific to border usage
 * @param color The base border color
 * @returns Object with border-specific variations
 */
export const generateBorderVariations = (color: string) => {
  return {
    base: color,
    light: lightenColor(color, COLOR_AMOUNTS.LIGHTEN_SMALL),
    dark: darkenColor(color, COLOR_AMOUNTS.DARKEN_SMALL),
    focus: saturateOrDesaturateColor(
      lightenColor(color, 10),
      COLOR_AMOUNTS.SATURATE,
    ),
    hover: lightenColor(color, COLOR_AMOUNTS.LIGHTEN_SMALL / 2),
    active: darkenColor(color, COLOR_AMOUNTS.DARKEN_SMALL / 2),
    disabled: setOpacity(color, COLOR_AMOUNTS.OPACITY_MEDIUM),
  };
};

/**
 * Generates variations optimized for color accessibility
 * @param color The base color
 * @returns Accessible color variations
 */
export const generateAccessibleVariations = (color: string) => {
  // Get contrast color
  const contrastText = getContrastColor(color);

  // Create base variations
  const baseVariations = generateColorVariations(color);

  // Ensure all colors have good contrast with their text
  return {
    ...baseVariations,
    // Override with accessible alternatives if needed
    light:
      getContrastColor(baseVariations.light) === contrastText
        ? baseVariations.light
        : lightenColor(color, COLOR_AMOUNTS.LIGHTEN_SMALL + 10),
    dark:
      getContrastColor(baseVariations.dark) === contrastText
        ? baseVariations.dark
        : darkenColor(color, COLOR_AMOUNTS.DARKEN_SMALL + 10),
  };
};
