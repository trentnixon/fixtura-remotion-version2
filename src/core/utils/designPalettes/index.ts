import { createPrimaryPalette } from "./primaryPalette";
import { createSecondaryPalette } from "./secondaryPalette";

import { createAccentPalette } from "./accentPalette";
import { createComplementaryPalette } from "./complementaryPalette";
import { createDarkPalette } from "./darkPalette";
import { createLightPalette } from "./lightPalette";
import { createMonochromaticPalette } from "./monochromaticPalette";
import { createTriadicPalette } from "./triadicPalette";

// designPalettes/index.ts
export * from "./types";
export { createPrimaryPalette } from "./primaryPalette";
export { createSecondaryPalette } from "./secondaryPalette";
export { createDarkPalette } from "./darkPalette";
export { createLightPalette } from "./lightPalette";
export { createAccentPalette } from "./accentPalette";
export { createComplementaryPalette } from "./complementaryPalette";
export { createTriadicPalette } from "./triadicPalette";
export { createMonochromaticPalette } from "./monochromaticPalette";

// A function to generate all palettes at once
export const generateAllPalettes = (
  primary: string,
  secondary: string,
  colorVariations: any,
  textColors: any,
  backgrounds: any,
  utility: any,
  shadows: any,
  contrast: any,
  gradients: any,
) => {
  return {
    primary: createPrimaryPalette(
      primary,
      secondary,
      colorVariations,
      textColors,
      shadows,
      gradients,
    ),
    secondary: createSecondaryPalette(
      primary,
      secondary,
      colorVariations,
      textColors,
      shadows,
      gradients,
      utility,
      contrast,
    ),
    dark: createDarkPalette(
      backgrounds,
      textColors,
      shadows,
      utility,
      contrast,
      primary,
    ),
    light: createLightPalette(
      primary,
      secondary,
      backgrounds,
      textColors,
      shadows,
      utility,
      contrast,
    ),
    accent: createAccentPalette(
      primary,
      secondary,
      colorVariations,
      textColors,
      shadows,
      utility,
      contrast,
    ),
    complementary: createComplementaryPalette(
      primary,
      textColors,
      shadows,
      utility,
      contrast,
      colorVariations,
    ),
    triadic: createTriadicPalette(
      primary,
      textColors,
      shadows,
      utility,
      contrast,
    ),
    monochromatic: createMonochromaticPalette(
      primary,
      colorVariations,
      textColors,
      shadows,
      utility,
      contrast,
    ),
  };
};
