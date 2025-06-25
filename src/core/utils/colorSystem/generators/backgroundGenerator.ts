import tinycolor from "tinycolor2";
import {
  lightenColor,
  darkenColor,
  setOpacity,
} from "../core/baseManipulation";

/**
 * Get a background color based on primary and secondary colors
 * @param primary Primary color
 * @param secondary Secondary color
 * @returns Optimal background color
 */
export const getBackgroundColor = (primary: string): string => {
  // Get a background that complements the primary color
  return tinycolor(primary).isDark()
    ? lightenColor(primary, 45) // For dark primary colors, use a light background
    : darkenColor(primary, 5); // For light primary colors, use a slightly darker background
};

/**
 * Generates background colors based on primary and secondary colors
 * @param primary Primary color
 * @param secondary Secondary color
 * @returns Background colors object
 */
export const generateBackgroundColors = (
  primary: string,
  secondary: string,
) => {
  const isDarkPrimary = tinycolor(primary).isDark();

  return {
    light: "#F9FAFB", // Very light gray (almost white)
    dark: "#111827", // Very dark gray (almost black)
    paper: isDarkPrimary ? "#1F2937" : "#FFFFFF", // Paper color based on primary
    default: getBackgroundColor(primary),
    primary: primary,
    secondary: secondary,
    subtle: setOpacity(primary, 0.05), // Very subtle primary color
    highlight: setOpacity(secondary, 0.2), // Subtle highlight color
  };
};

/**
 * Generates a set of surface colors for UI elements
 * @param baseColor Base color for surfaces
 * @param isDarkMode Whether in dark mode
 * @returns Surface colors object
 */
export const generateSurfaceColors = (
  baseColor: string,
  isDarkMode: boolean = false,
) => {
  // For light mode, start with white and add subtle tints
  // For dark mode, start with dark color and add subtle highlights
  const base = isDarkMode ? "#121212" : "#FFFFFF";

  return {
    base,
    // Different elevation levels
    elevated1: isDarkMode
      ? lightenColor(base, 5)
      : tinycolor(base).saturate(3).setAlpha(0.98).toString(),
    elevated2: isDarkMode
      ? lightenColor(base, 8)
      : tinycolor(base).saturate(4).setAlpha(0.96).toString(),
    elevated3: isDarkMode
      ? lightenColor(base, 12)
      : tinycolor(base).saturate(5).setAlpha(0.94).toString(),
    // Tinted surface with the base color
    tinted: isDarkMode
      ? tinycolor.mix(base, baseColor, 10).toString()
      : tinycolor.mix(base, baseColor, 4).toString(),
    // Hover states
    hover: isDarkMode ? lightenColor(base, 7) : darkenColor(base, 3),
    // Active/pressed states
    active: isDarkMode ? lightenColor(base, 10) : darkenColor(base, 5),
    // Disabled state
    disabled: setOpacity(base, 0.6),
  };
};

/**
 * Generates gradient background variations
 * @param primary Primary color
 * @param secondary Secondary color
 * @returns Gradient background variations
 */
export const generateGradientBackgrounds = (
  primary: string,
  secondary: string,
) => {
  return {
    primary: `linear-gradient(to right, ${primary}, ${lightenColor(primary, 15)})`,
    secondary: `linear-gradient(to right, ${secondary}, ${lightenColor(secondary, 15)})`,
    accent: `linear-gradient(to right, ${primary}, ${secondary})`,
    diagonal: `linear-gradient(to bottom right, ${primary}, ${secondary})`,
    radial: `radial-gradient(circle, ${primary}, ${secondary})`,
  };
};
