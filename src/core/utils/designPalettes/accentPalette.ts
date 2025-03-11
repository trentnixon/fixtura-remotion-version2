// designPalettes/accentPalette.ts
import { DesignPalette, ensureContrast } from "./types";
import tinycolor from "tinycolor2";

export const createAccentPalette = (
  primary: string,
  secondary: string,
  colorVariations: any,
  textColors: any,
  shadows: any,
  utility: any,
  contrast: any,
): DesignPalette => {
  const secondaryVariations = colorVariations.secondary;

  return {
    name: "Accent",
    background: {
      main: secondaryVariations.dark,
      light: secondaryVariations.base,
      dark: secondaryVariations.darker,
      contrast: secondaryVariations.contrastText,
      accent: colorVariations.primary.base,
      gradient: {
        primary: secondaryVariations.dark,
        secondary: secondaryVariations.base,
        css: `linear-gradient(to right, ${secondaryVariations.dark}, ${secondaryVariations.base})`,
        primaryToSecondary: `linear-gradient(to right, ${secondaryVariations.dark}, ${secondaryVariations.base})`,
        secondaryToPrimary: `linear-gradient(to left, ${secondaryVariations.dark}, ${secondaryVariations.base})`,
        radial: `radial-gradient(circle, ${secondaryVariations.dark}, ${secondaryVariations.base})`,
      },
    },
    container: {
      primary: secondaryVariations.base,
      secondary: secondaryVariations.light,
      light: "#FFFFFF",
      dark: secondaryVariations.darker,
      accent: secondaryVariations.accent,
      highlight: secondaryVariations.lighter,
      transparent: tinycolor(secondaryVariations.dark)
        .setAlpha(0.8)
        .toRgbString(),
      onBackground: {
        main: tinycolor(secondaryVariations.dark).lighten(10).toString(),
        light: tinycolor(secondaryVariations.dark).lighten(20).toString(),
        dark: tinycolor(secondaryVariations.dark).lighten(5).toString(),
      },
    },
    text: {
      onBackground: {
        main: ensureContrast(secondaryVariations.dark, textColors.onSecondary),
        light: ensureContrast(secondaryVariations.base, textColors.onSecondary),
        dark: ensureContrast(
          secondaryVariations.darker,
          textColors.onSecondary,
        ),
      },
      onContainer: {
        primary: ensureContrast(
          secondaryVariations.base,
          textColors.onSecondary,
        ),
        secondary: ensureContrast(
          secondaryVariations.light,
          textColors.onSecondary,
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(
          secondaryVariations.darker,
          textColors.onSecondary,
        ),
      },
      title: ensureContrast(secondaryVariations.dark, textColors.onSecondary),
      body: ensureContrast(secondaryVariations.dark, textColors.onSecondary),
      muted: tinycolor(
        ensureContrast(secondaryVariations.dark, textColors.onSecondary),
      )
        .setAlpha(0.7)
        .toRgbString(),
      primary: colorVariations.primary.base,
      secondary: colorVariations.secondary.base,
      accent: colorVariations.primary.accent,
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
        `0 0 15px ${tinycolor(secondaryVariations.dark).setAlpha(0.5).toRgbString()}`,
    },
  };
};
