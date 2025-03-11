// designPalettes/secondaryPalette.ts
import { DesignPalette, ensureContrast } from "./types";
import tinycolor from "tinycolor2";

export const createSecondaryPalette = (
  primary: string,
  secondary: string,
  colorVariations: any,
  textColors: any,
  shadows: any,
  gradients: any,
  utility: any,
  contrast: any,
): DesignPalette => {
  const secondaryVariations = colorVariations.secondary;

  return {
    name: "Secondary",
    background: {
      main: secondary,
      light: secondaryVariations.light,
      dark: secondaryVariations.dark,
      contrast: secondaryVariations.contrastText,
      accent: primary,
      gradient: {
        primary: secondary,
        secondary: secondaryVariations.light,
        css: gradients.secondary.css,
        primaryToSecondary: gradients.primaryToSecondary.css,
        secondaryToPrimary: gradients.secondaryToPrimary.css,
        radial: `radial-gradient(circle, ${secondary}, ${secondaryVariations.dark})`,
      },
    },
    container: {
      primary: secondaryVariations.light,
      secondary: secondaryVariations.lighter,
      light: "#FFFFFF",
      dark: secondaryVariations.darker,
      transparent: tinycolor(secondary).setAlpha(0.8).toRgbString(),
      accent: primary,
      highlight: secondaryVariations.lighter,
      onBackground: {
        main: tinycolor(secondary).lighten(10).toString(),
        light: tinycolor(secondary).lighten(20).toString(),
        dark: tinycolor(secondary).lighten(5).toString(),
      },
    },
    text: {
      onBackground: {
        main: ensureContrast(secondary, textColors.onSecondary),
        light: ensureContrast(
          secondaryVariations.light,
          textColors.onSecondary,
        ),
        dark: ensureContrast(secondaryVariations.dark, textColors.onSecondary),
      },
      onContainer: {
        primary: ensureContrast(
          secondaryVariations.light,
          textColors.onSecondary,
        ),
        secondary: ensureContrast(
          secondaryVariations.lighter,
          textColors.onSecondary,
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(
          secondaryVariations.darker,
          textColors.onSecondary,
        ),
      },
      title: ensureContrast(secondary, textColors.title),
      body: ensureContrast(secondary, textColors.body),
      muted: tinycolor(ensureContrast(secondary, textColors.onSecondary))
        .setAlpha(0.7)
        .toRgbString(),
      primary: colorVariations.primary.base,
      secondary: colorVariations.secondary.base,
      accent: primary,
      contrast: textColors.onSecondary,
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
        `0 0 15px ${tinycolor(secondary).setAlpha(0.5).toRgbString()}`,
    },
  };
};
