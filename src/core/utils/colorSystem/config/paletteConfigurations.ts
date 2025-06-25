import { PaletteConfiguration } from "../core/types";
import {
  getComplementaryColor,
  getAnalogousColor,
  getTriadicColor,
  getAccentColor,
} from "../core/colorRelationships";

/**
 * Creates an array of palette configurations based on primary and secondary colors
 * @param primary The primary color
 * @param secondary The secondary color
 * @returns Array of palette configurations
 */
export const createPaletteConfigurations = (
  primary: string,
  secondary: string,
): PaletteConfiguration[] => {
  return [
    // Main palettes using the primary and secondary colors
    {
      name: "primary",
      colors: [primary, secondary],
      options: {
        includeGradients: true,
        includeShadows: true,
      },
    },
    {
      name: "primaryOnWhite",
      colors: [primary, "white"],
      options: {
        includeGradients: true,
        includeShadows: true,
      },
    },
    {
      name: "primaryOnBlack",
      colors: [primary, "black"],
      options: {
        includeGradients: true,
        includeShadows: true,
      },
    },
    {
      name: "secondary",
      colors: [secondary, primary],
      options: {
        includeGradients: true,
        includeShadows: true,
      },
    },
    {
      name: "secondaryOnWhite",
      colors: [secondary, "white"],
      options: {
        includeGradients: true,
        includeShadows: true,
      },
    },
    {
      name: "secondaryOnBlack",
      colors: [secondary, "black"],
      options: {
        includeGradients: true,
        includeShadows: true,
      },
    },

    // Accent palettes based on color theory relationships
    {
      name: "accentPrimary",
      colors: [getAccentColor(primary), getComplementaryColor(primary)],
      options: {
        includeGradients: true,
        includeShadows: true,
      },
    },
    {
      name: "accentSecondary",
      colors: [getAccentColor(secondary), getComplementaryColor(secondary)],
      options: {
        includeGradients: true,
        includeShadows: true,
      },
    },

    // Complementary palettes
    {
      name: "complementary",
      colors: [primary, getComplementaryColor(primary)],
      options: {
        includeGradients: true,
        includeShadows: true,
      },
    },

    // Analogous palettes
    {
      name: "analogous",
      colors: [primary, getAnalogousColor(primary, 30)],
      options: {
        colorSpace: "hsl",
        includeGradients: true,
        includeShadows: true,
      },
    },

    // Triadic palettes
    {
      name: "triadic",
      colors: [primary, getTriadicColor(primary, 1)],
      options: {
        colorSpace: "hsl",
        includeGradients: true,
        includeShadows: true,
      },
    },

    // Monochromatic palette (using different shades of the same color)
    {
      name: "monochromatic",
      colors: [primary, primary], // Uses the same color, variations will be different shades
      options: {
        colorSpace: "hsl",
        includeGradients: true,
        includeShadows: true,
      },
    },

    // High contrast version of primary palette
    {
      name: "highContrast",
      colors: [primary, secondary],
      options: {
        includeGradients: true,
        includeShadows: true,
      },
    },
  ];
};

/**
 * Get a specific palette configuration by name
 * @param configurations Array of palette configurations
 * @param name Name of the desired configuration
 * @returns The requested configuration or undefined if not found
 */
export const getPaletteConfigurationByName = (
  configurations: PaletteConfiguration[],
  name: string,
): PaletteConfiguration | undefined => {
  return configurations.find((config) => config.name === name);
};

/**
 * Filter palette configurations based on a predicate function
 * @param configurations Array of palette configurations
 * @param predicate Function that determines whether to include a configuration
 * @returns Filtered array of configurations
 */
export const filterPaletteConfigurations = (
  configurations: PaletteConfiguration[],
  predicate: (config: PaletteConfiguration) => boolean,
): PaletteConfiguration[] => {
  return configurations.filter(predicate);
};
