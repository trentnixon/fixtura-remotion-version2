import tinycolor from "tinycolor2";
import { DesignPalette } from "../../designPalettes";
import {
  PaletteConfiguration,
  ColorVariations,
  StandardizedPalettes,
} from "../core/types";

/**
 * Validates whether a string is a valid color
 * @param color The color string to validate
 * @returns Boolean indicating if the color is valid
 */
export const isValidColor = (color: string | null | undefined): boolean => {
  if (!color) return false;
  return tinycolor(color).isValid();
};

/**
 * Validates a palette configuration
 * @param config The palette configuration to validate
 * @returns Object with validation result and error message if applicable
 */
export const validatePaletteConfiguration = (
  config: PaletteConfiguration,
): { isValid: boolean; error?: string } => {
  // Check if name exists
  if (!config.name) {
    return { isValid: false, error: "Palette configuration must have a name" };
  }

  // Check if colors array exists and has exactly two colors
  if (
    !config.colors ||
    !Array.isArray(config.colors) ||
    config.colors.length !== 2
  ) {
    return {
      isValid: false,
      error: "Palette configuration must have exactly two colors",
    };
  }

  // Validate each color
  for (let i = 0; i < config.colors.length; i++) {
    if (!isValidColor(config.colors[i])) {
      return {
        isValid: false,
        error: `Color at index ${i} is invalid: ${config.colors[i]}`,
      };
    }
  }

  return { isValid: true };
};

/**
 * Validates color variations object for completeness
 * @param variations The color variations to validate
 * @returns Object with validation result and error message if applicable
 */
export const validateColorVariations = (
  variations: ColorVariations,
): { isValid: boolean; error?: string } => {
  // Required properties that should exist in a ColorVariations object
  const requiredProps = [
    "base",
    "light",
    "lighter",
    "lightest",
    "dark",
    "darker",
    "darkest",
    "transparent",
    "semiTransparent",
    "contrastText",
  ];

  // Check if all required properties exist
  for (const prop of requiredProps) {
    if (!(prop in variations)) {
      return { isValid: false, error: `Missing required property: ${prop}` };
    }

    // Validate that each property is a valid color
    if (!isValidColor(variations[prop])) {
      return {
        isValid: false,
        error: `Invalid color for property ${prop}: ${variations[prop]}`,
      };
    }
  }

  return { isValid: true };
};

/**
 * Validates a standardized palette object
 * @param palette The palette to validate
 * @returns Object with validation result and error message if applicable
 */
export const validateStandardizedPalette = (
  palette: DesignPalette,
): { isValid: boolean; error?: string } => {
  // Check if palette has required sections
  if (!palette.background) {
    return { isValid: false, error: "Missing required section: background" };
  }

  if (!palette.container) {
    return { isValid: false, error: "Missing required section: container" };
  }

  if (!palette.text) {
    return { isValid: false, error: "Missing required section: text" };
  }

  // Check essential background properties
  const requiredBackgroundProps = ["main", "light", "dark", "contrast"];
  for (const prop of requiredBackgroundProps) {
    if (!(prop in palette.background)) {
      return {
        isValid: false,
        error: `Missing required background property: ${prop}`,
      };
    }
  }

  // Check essential container properties
  const requiredContainerProps = [
    "main",
    "light",
    "dark",
    "primary",
    "secondary",
  ];
  for (const prop of requiredContainerProps) {
    if (!(prop in palette.container)) {
      return {
        isValid: false,
        error: `Missing required container property: ${prop}`,
      };
    }
  }

  // Check text sections
  if (!palette.text.onBackground || !palette.text.onContainer) {
    return { isValid: false, error: "Missing required text subsections" };
  }

  return { isValid: true };
};

/**
 * Validates an entire collection of standardized palettes
 * @param palettes The palettes collection to validate
 * @returns Object with validation result and error message if applicable
 */
export const validateStandardizedPalettes = (
  palettes: StandardizedPalettes,
): { isValid: boolean; error?: string } => {
  // Check if at least primary and secondary palettes exist
  if (!palettes.primary) {
    return { isValid: false, error: "Missing required primary palette" };
  }

  if (!palettes.secondary) {
    return { isValid: false, error: "Missing required secondary palette" };
  }

  // Validate each palette
  for (const [name, palette] of Object.entries(palettes)) {
    const validation = validateStandardizedPalette(palette as DesignPalette);
    if (!validation.isValid) {
      return {
        isValid: false,
        error: `Invalid palette "${name}": ${validation.error}`,
      };
    }
  }

  return { isValid: true };
};

/**
 * Checks if two colors have sufficient contrast for the specified purpose
 * @param foreground The foreground color (text)
 * @param background The background color
 * @param purpose The purpose of the contrast check ('text', 'largeText', or 'ui')
 * @returns Object with validation result and contrast ratio
 */
export const hasMinimumContrast = (
  foreground: string,
  background: string,
  purpose: "text" | "largeText" | "ui" = "text",
): { passes: boolean; ratio: number } => {
  // Calculate the contrast ratio
  const ratio = tinycolor.readability(foreground, background);

  // Minimum ratios for different purposes
  const minimumRatios = {
    text: 4.5, // WCAG AA for normal text
    largeText: 3.0, // WCAG AA for large text
    ui: 3.0, // Common minimum for UI elements
  };

  return {
    passes: ratio >= minimumRatios[purpose],
    ratio,
  };
};

/**
 * Provides suggestions to fix a color when it fails validation
 * @param color The color that failed validation
 * @returns Object with suggested fixes
 */
export const suggestColorFixes = (
  color: string,
): { suggestedColor?: string; reason?: string } => {
  if (!color) {
    return { reason: "Empty color value", suggestedColor: "#000000" };
  }

  // Try to parse the color with tinycolor
  const parsedColor = tinycolor(color);

  if (!parsedColor.isValid()) {
    // Check if it might be missing a hash for hex
    if (/^[0-9A-Fa-f]{3,8}$/.test(color)) {
      return {
        reason: "Missing # prefix for hex color",
        suggestedColor: `#${color}`,
      };
    }

    // Check if it might be RGB values without the rgb() wrapper
    if (/^\s*\d+\s*,\s*\d+\s*,\s*\d+\s*$/.test(color)) {
      return {
        reason: "Missing rgb() wrapper",
        suggestedColor: `rgb(${color})`,
      };
    }

    return { reason: "Invalid color format" };
  }

  return { suggestedColor: parsedColor.toString() };
};
