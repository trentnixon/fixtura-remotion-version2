// designPalettes/primaryPalette.ts
import { DesignPalette, ensureContrast } from "./types";
import tinycolor from "tinycolor2";

export const createPrimaryPalette = (
  primary: string,
  secondary: string,
  colorVariations: any,
  textColors: any,
  shadows: any,
  gradients: any,
  utility: any,
  contrast: any,
): DesignPalette => {
  const primaryVariations = colorVariations.primary;
  console.log("[primaryVariations]", primaryVariations);
  return {
    name: "Primary",
    background: {
      main: primary,
      light: primaryVariations.light,
      dark: primaryVariations.dark,
      contrast: primaryVariations.contrastText,
      accent: secondary,
      gradient: {
        primary: primary,
        secondary: primaryVariations.light,
        css: gradients.primary.css,
        primaryToSecondary: gradients.primaryToSecondary.css,
        secondaryToPrimary: gradients.secondaryToPrimary.css,
        radial: `radial-gradient(circle, ${primary}, ${primaryVariations.dark})`,
      },
    },
    container: {
      primary: primaryVariations.light,
      secondary: primaryVariations.lighter,
      accent: secondary,
      highlight: primaryVariations.lighter,
      light: "#FFFFFF",
      dark: primaryVariations.darker,
      transparent: tinycolor(primary).setAlpha(0.8).toRgbString(),
      onBackground: {
        main: tinycolor(primary).lighten(10).toString(),
        light: tinycolor(primary).lighten(20).toString(),
        dark: tinycolor(primary).lighten(5).toString(),
      },
    },
    text: {
      onBackground: {
        main: ensureContrast(primary, textColors.onPrimary),
        light: ensureContrast(primaryVariations.light, textColors.onPrimary),
        dark: ensureContrast(primaryVariations.dark, textColors.onPrimary),
      },
      onContainer: {
        primary: ensureContrast(primaryVariations.light, textColors.onPrimary),
        secondary: ensureContrast(
          primaryVariations.lighter,
          textColors.onPrimary,
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(primaryVariations.darker, textColors.onPrimary),
      },
      title: ensureContrast(primary, textColors.title),
      body: ensureContrast(primary, textColors.body),
      muted: tinycolor(ensureContrast(primary, textColors.onPrimary))
        .setAlpha(0.7)
        .toRgbString(),
      primary: colorVariations.primary.base,
      secondary: colorVariations.secondary.base,
      accent: secondary,
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
