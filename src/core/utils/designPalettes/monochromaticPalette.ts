// designPalettes/monochromaticPalette.ts
import { DesignPalette, ensureContrast } from "./types";
import tinycolor from "tinycolor2";

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
        primary: primaryVariations.darker,
        secondary: primaryVariations.lighter,
        css: `linear-gradient(to right, ${primaryVariations.darker}, ${primaryVariations.lighter})`,
        primaryToSecondary: `linear-gradient(to right, ${primaryVariations.darker}, ${primaryVariations.lighter})`,
        secondaryToPrimary: `linear-gradient(to left, ${primaryVariations.darker}, ${primaryVariations.lighter})`,
        radial: `radial-gradient(circle, ${primaryVariations.darker}, ${primaryVariations.lighter})`,
      },
    },
    container: {
      primary: primaryVariations.light,
      secondary: primaryVariations.lighter,
      light: primaryVariations.lightest,
      dark: primaryVariations.darkest,
      transparent: tinycolor(primary).setAlpha(0.8).toRgbString(),
      accent: accentColor,
      highlight: primaryVariations.lightest,
      onBackground: {
        main: tinycolor(primary).lighten(10).toString(),
        light: tinycolor(primary).lighten(20).toString(),
        dark: tinycolor(primary).darken(10).toString(),
      },
    },
    text: {
      onBackground: {
        main: ensureContrast(primary, textColors.onPrimary),
        light: ensureContrast(primaryVariations.lighter, textColors.onPrimary),
        dark: ensureContrast(primaryVariations.darker, textColors.onPrimary),
      },
      onContainer: {
        primary: ensureContrast(primaryVariations.light, textColors.onPrimary),
        secondary: ensureContrast(
          primaryVariations.lighter,
          textColors.onPrimary,
        ),
        light: ensureContrast(primaryVariations.lightest, textColors.onPrimary),
        dark: ensureContrast(primaryVariations.darkest, textColors.onPrimary),
      },
      title: ensureContrast(primary, textColors.onPrimary),
      body: ensureContrast(primary, textColors.onPrimary),
      muted: tinycolor(ensureContrast(primary, textColors.onPrimary))
        .setAlpha(0.7)
        .toRgbString(),
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
