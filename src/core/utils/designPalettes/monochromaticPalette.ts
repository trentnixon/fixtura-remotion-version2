// designPalettes/monochromaticPalette.ts
import { DesignPalette, ensureContrast, GradientOptions } from "./types";
import tinycolor from "tinycolor2";

// Helper function to create gradient options
const createGradientOptions = (
  color1: string,
  color2: string,
  type: "linear" | "radial" = "linear",
  direction: string = "to right",
): GradientOptions => ({
  direction,
  type,
  stops: [color1, color2],
  css: {
    DEFAULT: `linear-gradient(to right, ${color1}, ${color2})`,
    DIAGONAL: `linear-gradient(45deg, ${color1}, ${color2})`,
    DIAGONAL_REVERSE: `linear-gradient(135deg, ${color1}, ${color2})`,
    HORIZONTAL: `linear-gradient(90deg, ${color1}, ${color2})`,
    HORIZONTAL_REVERSE: `linear-gradient(270deg, ${color1}, ${color2})`,
    VERTICAL: `linear-gradient(180deg, ${color1}, ${color2})`,
    VERTICAL_REVERSE: `linear-gradient(0deg, ${color1}, ${color2})`,
    CONIC: `conic-gradient(${color1}, ${color2}, ${color1})`,
  },
});

export const createMonochromaticPalette = (
  primary: string,
  colorVariations: any,
  textColors: any,
  shadows: any,
  utility: any,
  contrast: any,
): DesignPalette => {
  const primaryVariations = colorVariations.primary;
  const accentColor =
    primaryVariations.accent || tinycolor(primary).spin(30).toString();

  return {
    name: "Monochromatic",
    background: {
      main: primary,
      light: primaryVariations.lighter,
      dark: primaryVariations.darker,
      contrast: primaryVariations.contrastText,
      accent: accentColor,
      gradient: {
        primary: createGradientOptions(
          primaryVariations.darker,
          primaryVariations.lighter,
        ),
        secondary: createGradientOptions(
          primaryVariations.lighter,
          primaryVariations.lighter,
        ),
        primaryToSecondary: createGradientOptions(
          primaryVariations.darker,
          primaryVariations.lighter,
        ),
        secondaryToPrimary: createGradientOptions(
          primaryVariations.lighter,
          primaryVariations.darker,
          "linear",
          "to left",
        ),
        radial: `radial-gradient(circle, ${primaryVariations.darker}, ${primaryVariations.lighter})`,
        conicGradient: createGradientOptions(
          primaryVariations.darker,
          primaryVariations.lighter,
        ),
        hardStopGradient: createGradientOptions(
          primaryVariations.darker,
          primaryVariations.lighter,
        ),
        meshGradient: createGradientOptions(
          primaryVariations.darker,
          primaryVariations.lighter,
        ),
        primaryAdvanced: createGradientOptions(
          primaryVariations.darker,
          primaryVariations.lighter,
        ),
        primaryRadial: createGradientOptions(
          primaryVariations.darker,
          primaryVariations.lighter,
          "radial",
        ),
        secondaryAdvanced: createGradientOptions(
          primaryVariations.lighter,
          primaryVariations.light,
        ),
        secondaryRadial: createGradientOptions(
          primaryVariations.lighter,
          primaryVariations.light,
          "radial",
        ),
      },
    },
    container: {
      primary: primaryVariations.light,
      secondary: primaryVariations.lighter,
      main: primaryVariations.light,
      light: primaryVariations.lightest,
      dark: primaryVariations.darkest,
      transparent: tinycolor(primary).setAlpha(0.8).toRgbString(),
      accent: accentColor,
      highlight: primaryVariations.lightest,
    },
    text: {
      onBackground: {
        main: ensureContrast(primary, textColors.onPrimary),
        light: ensureContrast(primaryVariations.lighter, textColors.onPrimary),
        dark: ensureContrast(primaryVariations.darker, textColors.onPrimary),
        muted: tinycolor(ensureContrast(primary, textColors.onPrimary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: accentColor,
      },
      onContainer: {
        primary: ensureContrast(primaryVariations.light, textColors.onPrimary),
        secondary: ensureContrast(
          primaryVariations.lighter,
          textColors.onPrimary,
        ),
        light: ensureContrast(primaryVariations.lightest, textColors.onPrimary),
        dark: ensureContrast(primaryVariations.darkest, textColors.onPrimary),
        muted: tinycolor(ensureContrast(primary, textColors.onPrimary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: accentColor,
      },
      title: ensureContrast(primary, textColors.onPrimary),
      body: ensureContrast(primary, textColors.onPrimary),
      primary: primaryVariations.base,
      secondary: primaryVariations.light,
      accent: accentColor,
      contrast: textColors.onPrimary,
      safePrimary: contrast.primary.safeColor,
      safeSecondary: contrast.secondary.safeColor,
      highlight: utility.success,
    },

    shadow: {
      small: shadows.small,
      medium: shadows.medium,
      large: shadows.large,
      glow:
        shadows.glow ||
        `0 0 15px ${tinycolor(primary).setAlpha(0.5).toRgbString()}`,
    },
  };
};
