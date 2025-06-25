import { ThemeColorUtils } from "./core/types";
import { generateAllPalettes } from "../designPalettes";

// Import all generator functions
import {
  generateColorVariations,
  generateUtilityColors,
} from "./generators/utilityColors";
import { generateGradientOptions } from "./generators/gradientUtils";
import { generateTextColors } from "./generators/textUtils";
import { generateBackgroundColors } from "./generators/backgroundUtils";
import { generateShadows } from "./generators/shadowUtils";
import { generateContrastSafety } from "./generators/contrastUtils";

// Re-export types and base manipulation functions for external use
export * from "./core/types";
export * from "./core/baseManipulation";

// Export all generator functions
export * from "./generators/utilityColors";
export * from "./generators/paletteGenerators";
export * from "./generators/gradientUtils";
export * from "./generators/contrastUtils";
export * from "./generators/backgroundUtils";
export * from "./generators/textUtils";
export * from "./generators/shadowUtils";

/**
 * Creates a comprehensive set of color utilities based on primary and secondary colors
 */
export const createThemeColorUtils = (
  primary: string,
  secondary: string,
): ThemeColorUtils => {
  // Generate color variations
  const primaryVariations = generateColorVariations(primary);
  const secondaryVariations = generateColorVariations(secondary);

  // Generate gradients
  const primaryGradient = generateGradientOptions(primary);
  const secondaryGradient = generateGradientOptions(secondary);
  const primaryToSecondaryGradient = generateGradientOptions(
    primary,
    secondary,
  );
  const secondaryToPrimaryGradient = generateGradientOptions(
    secondary,
    primary,
    "to left",
  );

  // Generate utility colors
  const utility = generateUtilityColors(primary);

  // Generate text colors
  const text = generateTextColors(primary, secondary);

  // Generate background colors
  const background = generateBackgroundColors(primary, secondary);

  // Generate shadows
  const shadows = generateShadows(primary);

  // Generate contrast safety
  const contrast = generateContrastSafety(primary, secondary, background);

  // Generate design palettes using the imported function

  const designPalettes = generateAllPalettes(
    primary,
    secondary,
    {
      primary: primaryVariations,
      secondary: secondaryVariations,
    },
    text,
    background,
    utility,
    shadows,
    contrast,
    {
      primary: primaryGradient,
      secondary: secondaryGradient,
      primaryToSecondary: primaryToSecondaryGradient,
      secondaryToPrimary: secondaryToPrimaryGradient,
    },
  );

  // Return theme color utils
  return {
    variations: {
      primary: primaryVariations,
      secondary: secondaryVariations,
    },
    designPalettes,
  };
};
