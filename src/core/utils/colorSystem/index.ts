import { ColorSystem, ColorVariations } from "./core/types";
import { getValidColorOrFallback } from "./config/defaultColors";
import { createPaletteConfigurations } from "./config/paletteConfigurations";
import { createStandardizedPalettes } from "./createStandardizedPalettes";
import { DesignPalette } from "../designPalettes/types";
import {
  getContrastColor,
  lightenColor,
  darkenColor,
  setOpacity,
} from "./core/baseManipulation";
import { ThemeMode } from "../../../templates/types/TemplateThemeConfig";

/**
 * Creates a comprehensive color system based on primary and secondary colors
 * @param primaryColor The primary color for the system
 * @param secondaryColor The secondary color for the system
 * @returns A complete color system with various palettes and utilities
 */
export const createColorSystem = (
  primaryColor: string,
  secondaryColor: string,
  useMode: ThemeMode,
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
    useMode,
  );

  // Extract variations from the palettes for easy access
  const variations = Object.entries(palettes).reduce(
    (acc, [key, palette]) => {
      const p = palette as DesignPalette;
      const variationData: ColorVariations = {
        base: p.background.main,
        light: p.background.light,
        lighter: p.background.light,
        lightest: p.background.light,
        dark: p.background.dark,
        darker: p.background.dark,
        darkest: p.background.dark,
        transparent: p.background.main,
        semiTransparent: p.background.main,
        contrastText: p.background.contrast,
        saturated: p.background.main,
        desaturated: p.background.main,
        muted: p.background.main,
        accent: p.background.accent,
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
      getContrastColor,
      lightenColor,
      darkenColor,
      setOpacity,
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
