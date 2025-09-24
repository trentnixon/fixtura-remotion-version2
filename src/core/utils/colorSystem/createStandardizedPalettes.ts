import { ThemeMode } from "../../../templates/types/TemplateThemeConfig";
import { PaletteConfiguration, StandardizedPalettes } from "./core/types";
import { standardPaletteFactory } from "./generators/standardPaletteFactory";

/**
 * Creates all standardized palettes based on the given configurations
 * @param primary The primary color
 * @param secondary The secondary color
 * @param configurations Array of palette configurations
 * @returns Object containing all generated palettes
 */
export const createStandardizedPalettes = (
  primary: string,
  secondary: string,
  configurations: PaletteConfiguration[],
  useMode: ThemeMode,
): StandardizedPalettes => {
  // Initialize result object
  const result: StandardizedPalettes = {} as StandardizedPalettes;

  // Process each configuration to create standardized palettes
  configurations.forEach((config) => {
    // Ensure includeGradients is true to avoid undefined gradient
    const options = {
      ...config.options,
      includeGradients: true,
      originalPrimary: primary,
      originalSecondary: secondary,
    };

    // Generate the palette using the factory
    const palette = standardPaletteFactory(
      config.name,
      config.colors,
      options,
      useMode,
    );

    // Add the palette to the result object
    result[config.name] = palette;
  });

  // Ensure we have at least primary and secondary palettes
  if (!result.primary || !result.secondary) {
    // If configurations didn't include primary/secondary, add them
    if (!result.primary) {
      result.primary = standardPaletteFactory(
        "primary",
        [primary, secondary],
        {
          includeGradients: true,
          includeShadows: true,
        },
        useMode,
      );
    }

    if (!result.secondary) {
      result.secondary = standardPaletteFactory(
        "secondary",
        [secondary, primary],
        { includeGradients: true, includeShadows: true },
        useMode,
      );
    }
  }

  return result;
};
