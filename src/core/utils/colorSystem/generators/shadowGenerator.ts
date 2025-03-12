import { Shadows } from "../core/types";
import { setOpacity } from "../core/baseManipulation";
import { SHADOW_SIZES } from "../config/constants";

/**
 * Generate themed shadow
 * @param color Base color for the shadow
 * @param size Shadow size (5, 10, 20)
 * @returns CSS shadow string
 */
export const generateThemedShadow = (color: string, size: number): string => {
  const shadowColor = setOpacity(color, 0.2);
  const lighterShadowColor = setOpacity(color, 0.1);

  const defaultShadows = {
    [SHADOW_SIZES.SMALL]: `0 1px 3px 0 ${shadowColor}, 0 1px 2px 0 ${lighterShadowColor}`,
    [SHADOW_SIZES.MEDIUM]: `0 4px 6px -1px ${shadowColor}, 0 2px 4px -1px ${lighterShadowColor}`,
    [SHADOW_SIZES.LARGE]: `0 10px 15px -3px ${shadowColor}, 0 4px 6px -2px ${lighterShadowColor}`,
  };

  return (
    defaultShadows[size as keyof typeof defaultShadows] ||
    defaultShadows[SHADOW_SIZES.MEDIUM]
  );
};

/**
 * Generates shadow styles based on a color
 * @param color Base color for shadows
 * @returns Shadows object
 */
export const generateShadows = (color: string): Shadows => {
  return {
    small: generateThemedShadow(color, SHADOW_SIZES.SMALL),
    medium: generateThemedShadow(color, SHADOW_SIZES.MEDIUM),
    large: generateThemedShadow(color, SHADOW_SIZES.LARGE),
    glow: `0 0 15px ${setOpacity(color, 0.5)}`,
  };
};

/**
 * Generates elevation shadows for material design-like effects
 * @param color Base color for shadows
 * @param elevations Number of elevation levels to generate
 * @returns Object with elevation shadow styles
 */
export const generateElevationShadows = (
  color: string,
  elevations: number = 5,
): Record<string, string> => {
  const result: Record<string, string> = {};

  // Define shadow properties for each elevation level
  const shadowDefs = [
    { y: 1, blur: 3, spread: 0, opacity: 0.12 }, // Elevation 1
    { y: 2, blur: 6, spread: 2, opacity: 0.14 }, // Elevation 2
    { y: 3, blur: 8, spread: 2, opacity: 0.16 }, // Elevation 3
    { y: 4, blur: 10, spread: 3, opacity: 0.18 }, // Elevation 4
    { y: 6, blur: 15, spread: 5, opacity: 0.2 }, // Elevation 5
  ];

  // Generate shadow for each elevation
  for (let i = 0; i < Math.min(elevations, shadowDefs.length); i++) {
    const { y, blur, spread, opacity } = shadowDefs[i];
    const shadowColor = setOpacity(color, opacity);

    result[`elevation${i + 1}`] =
      `0 ${y}px ${blur}px ${spread}px ${shadowColor}`;
  }

  return result;
};

/**
 * Generates inner shadow (inset) styles
 * @param color Base color for shadows
 * @returns Object with inset shadow styles
 */
export const generateInsetShadows = (color: string): Record<string, string> => {
  return {
    insetSmall: `inset 0 1px 2px 0 ${setOpacity(color, 0.2)}`,
    insetMedium: `inset 0 2px 4px 0 ${setOpacity(color, 0.3)}`,
    insetLarge: `inset 0 3px 8px 0 ${setOpacity(color, 0.35)}`,
  };
};
