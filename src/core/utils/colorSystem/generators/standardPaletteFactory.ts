// standardPaletteFactory.ts
import tinycolor from "tinycolor2";
import { PaletteOptions } from "../core/types";
import { createColorVariations } from "../core/baseManipulation";
import {
  generateGradientOptions,
  createAdvancedGradient,
  GRADIENT_TYPES,
  generateRadialGradient,
  generateConicGradient,
  generateMeshGradient,
  generateHardStopGradient,
} from "./gradientGenerator";
import { generateTextColors } from "./textGenerator";
import { generateShadows } from "./shadowGenerator";
import { generateUtilityColors } from "./utilityGenerator";
import { generateContrastSafety } from "./contrastGenerator";
import { generateBackgroundColors } from "./backgroundGenerator";
import { createStandardPaletteStructure } from "../config/standardPaletteStructure";
import { GRADIENT_DIRECTIONS } from "../config/constants";

// Extended palette options to include gradient configuration
export interface ExtendedPaletteOptions extends PaletteOptions {
  // Advanced gradient options
  advancedGradients?: boolean;
  gradientTypes?: {
    primary?: GRADIENT_TYPES;
    secondary?: GRADIENT_TYPES;
  };
}

/**
 * Creates a standardized palette from a pair of colors
 * @param name Palette name
 * @param colors Array of two colors [main, secondary]
 * @param options Configuration options
 * @returns Standardized palette
 */
export const standardPaletteFactory = (
  name: string,
  colors: [string, string],
  options: ExtendedPaletteOptions = {},
) => {
  // Extract colors
  console.log("[colors]", colors);
  const [main, secondary] = colors;

  // Generate color variations
  const mainVariations = createColorVariations(main);
  const secondaryVariations = createColorVariations(secondary);

  // Generate utility colors based on main color
  const utilityColors = generateUtilityColors(main);

  // Generate text colors
  const textColors = generateTextColors(main, secondary);

  // Generate background colors
  const backgroundColors = generateBackgroundColors(main, secondary);

  // Generate shadows if needed
  const shadows =
    options.includeShadows !== false ? generateShadows(main) : undefined;

  // Generate gradients if needed
  const gradients =
    options.includeGradients !== false
      ? {
          // Basic gradients (for backward compatibility)
          primary: generateGradientOptions(main),
          secondary: generateGradientOptions(secondary),
          primaryToSecondary: generateGradientOptions(main, secondary),
          secondaryToPrimary: generateGradientOptions(secondary, main),

          // Advanced gradients using the new gradient generator
          primaryAdvanced: createAdvancedGradient(
            [main, tinycolor(main).lighten(20).toString()],
            options.gradientTypes?.primary || GRADIENT_TYPES.LINEAR,
            { position: GRADIENT_DIRECTIONS.HORIZONTAL },
          ),

          secondaryAdvanced: createAdvancedGradient(
            [secondary, tinycolor(secondary).lighten(20).toString()],
            options.gradientTypes?.secondary || GRADIENT_TYPES.LINEAR,
            { position: GRADIENT_DIRECTIONS.HORIZONTAL },
          ),

          // Radial gradients
          primaryRadial: createAdvancedGradient(
            [tinycolor(main).lighten(25).toString(), main],
            GRADIENT_TYPES.RADIAL,
            { shape: "circle" },
          ),

          secondaryRadial: createAdvancedGradient(
            [tinycolor(secondary).lighten(25).toString(), secondary],
            GRADIENT_TYPES.RADIAL,
            { shape: "circle" },
          ),

          // Conic gradient with both colors
          conicGradient: createAdvancedGradient(
            [main, secondary, main],
            GRADIENT_TYPES.CONIC,
            { angle: 45 },
          ),

          // Mesh gradient effect
          meshGradient: {
            type: "linear" as "linear" | "radial",
            direction: "",
            stops: [main, secondary],
            css: generateMeshGradient([
              {
                colors: [main, `${main}00`],
                direction: "217deg",
                opacity: 0.8,
              },
              {
                colors: [secondary, `${secondary}00`],
                direction: "127deg",
                opacity: 0.8,
              },
            ]),
          },

          // Hard-stop gradient
          hardStopGradient: {
            type: "linear" as "linear" | "radial",
            direction: GRADIENT_DIRECTIONS.HORIZONTAL,
            stops: [main, secondary],
            css: generateHardStopGradient([main, secondary], [50, 50]),
          },
        }
      : {
          // Original basic gradients
          primary: generateGradientOptions(main),
          secondary: generateGradientOptions(secondary),
          primaryToSecondary: generateGradientOptions(main, secondary),
          secondaryToPrimary: generateGradientOptions(
            secondary,
            main,
            "to left",
          ),
        };

  // Generate contrast safety information
  const contrast = generateContrastSafety(main, secondary, backgroundColors);

  // Create and return the standard palette structure
  return createStandardPaletteStructure(
    name,
    main,
    secondary,
    mainVariations,
    textColors,
    shadows || {
      small: "",
      medium: "",
      large: "",
      glow: "",
    },
    (gradients || {
      primary: { direction: "", type: "linear", stops: [], css: "" },
      secondary: { direction: "", type: "linear", stops: [], css: "" },
      primaryToSecondary: { direction: "", type: "linear", stops: [], css: "" },
      secondaryToPrimary: { direction: "", type: "linear", stops: [], css: "" },
    }) as any,
    options,
  );
};
