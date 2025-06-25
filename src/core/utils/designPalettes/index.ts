import { createPrimaryPalette } from "./primaryPalette";
import { createSecondaryPalette } from "./secondaryPalette";
import { createAccentPalette } from "./accentPalette";
import { createComplementaryPalette } from "./complementaryPalette";
import { createDarkPalette } from "./darkPalette";
import { createLightPalette } from "./lightPalette";
import { createMonochromaticPalette } from "./monochromaticPalette";
import { createTriadicPalette } from "./triadicPalette";
import {
  ColorVariations,
  TextColors,
  UtilityColors,
  ShadowOptions,
  ContrastOptions,
} from "./types";

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
  colorVariations: ColorVariations,
  textColors: TextColors,
  backgrounds: { light?: string; dark?: string },
  utility: UtilityColors,
  shadows: ShadowOptions,
  contrast: ContrastOptions,
  gradients: unknown,
) => {
  return {
    primary: createPrimaryPalette(
      primary,
      secondary,
      colorVariations,
      textColors,
      shadows,
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
