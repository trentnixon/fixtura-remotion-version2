import { ColorSystem, ColorVariations } from "./core/types";
import { getValidColorOrFallback } from "./config/defaultColors";
import { createPaletteConfigurations } from "./config/paletteConfigurations";
import { createStandardizedPalettes } from "./createStandardizedPalettes";

/**
 * Creates a comprehensive color system based on primary and secondary colors
 * @param primaryColor The primary color for the system
 * @param secondaryColor The secondary color for the system
 * @returns A complete color system with various palettes and utilities
 */
export const createColorSystem = (
  primaryColor: string,
  secondaryColor: string,
): ColorSystem => {
  // Validate input colors and use fallbacks if necessary
  const primary = getValidColorOrFallback(primaryColor, "PRIMARY");
  const secondary = getValidColorOrFallback(secondaryColor, "SECONDARY");

  // Create palette configurations
  const paletteConfigurations = createPaletteConfigurations(primary, secondary);

  // Generate the standardized palettes
  const palettes = createStandardizedPalettes(
    primary,
    secondary,
    paletteConfigurations,
  );

  // Extract variations from the palettes for easy access
  const variations = Object.entries(palettes).reduce(
    (acc, [key, palette]) => {
      // Extract variation data from the palette
      const variationData: ColorVariations = {
        base: palette.background.main,
        light: palette.background.light,
        lighter: palette.background.light,
        lightest: palette.background.light,
        dark: palette.background.dark,
        darker: palette.background.dark,
        darkest: palette.background.dark,
        transparent: palette.background.main,
        semiTransparent: palette.background.main,
        contrastText: palette.background.contrast,
        saturated: palette.background.main,
        desaturated: palette.background.main,
        muted: palette.background.main,
        accent: palette.background.accent,
      };

      return {
        ...acc,
        [key]: variationData,
      };
    },
    {
      // Initialize with empty objects that will be filled in the reducer
      primary: {} as ColorVariations,
      secondary: {} as ColorVariations,
    },
  );

  // Return the complete color system
  return {
    variations,
    palettes,
    utils: {
      // Include utility functions for direct use
      getContrastColor: (color: string) => {
        return require("./core/baseManipulation").getContrastColor(color);
      },
      lightenColor: (color: string, amount: number) => {
        return require("./core/baseManipulation").lightenColor(color, amount);
      },
      darkenColor: (color: string, amount: number) => {
        return require("./core/baseManipulation").darkenColor(color, amount);
      },
      setOpacity: (color: string, alpha: number) => {
        return require("./core/baseManipulation").setOpacity(color, alpha);
      },
      // Add other utility functions as needed
    },
  };
};

// Export main types for external use
export * from "./core/types";

// Export utility functions
export * from "./core/baseManipulation";
export * from "./core/colorRelationships";

// Export configurations
export { createPaletteConfigurations } from "./config/paletteConfigurations";
export { DEFAULT_COLORS } from "./config/constants";
export { DEFAULT_PALETTE_PRESETS } from "./config/defaultColors";

// Default export
export default createColorSystem;
