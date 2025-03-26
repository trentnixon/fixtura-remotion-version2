// designPalettes/secondaryPalette.ts
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
        primary: createGradientOptions(secondary, secondaryVariations.light),
        secondary: createGradientOptions(
          secondaryVariations.light,
          secondaryVariations.dark,
        ),
        primaryToSecondary: createGradientOptions(secondary, primary),
        secondaryToPrimary: createGradientOptions(
          primary,
          secondary,
          "linear",
          "to left",
        ),
        radial: `radial-gradient(circle, ${secondary}, ${secondaryVariations.dark})`,
        conicGradient: createGradientOptions(
          secondary,
          secondaryVariations.dark,
        ),
        hardStopGradient: createGradientOptions(
          secondary,
          secondaryVariations.dark,
        ),
        meshGradient: createGradientOptions(
          secondary,
          secondaryVariations.dark,
        ),
        primaryAdvanced: createGradientOptions(
          secondary,
          secondaryVariations.light,
        ),
        primaryRadial: createGradientOptions(
          secondary,
          secondaryVariations.light,
          "radial",
        ),
        secondaryAdvanced: createGradientOptions(
          secondaryVariations.light,
          secondaryVariations.dark,
        ),
        secondaryRadial: createGradientOptions(
          secondaryVariations.light,
          secondaryVariations.dark,
          "radial",
        ),
      },
    },
    container: {
      primary: secondaryVariations.light,
      secondary: secondaryVariations.lighter,
      main: secondaryVariations.light,
      light: "#FFFFFF",
      dark: secondaryVariations.darker,
      transparent: tinycolor(secondary).setAlpha(0.8).toRgbString(),
      accent: primary,
      highlight: secondaryVariations.lighter,
    },
    text: {
      onBackground: {
        main: ensureContrast(secondary, textColors.onSecondary),
        light: ensureContrast(
          secondaryVariations.light,
          textColors.onSecondary,
        ),
        dark: ensureContrast(secondaryVariations.dark, textColors.onSecondary),
        muted: tinycolor(ensureContrast(secondary, textColors.onSecondary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
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
        muted: tinycolor(ensureContrast(secondary, textColors.onSecondary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
      },
      title: ensureContrast(secondary, textColors.title),
      body: ensureContrast(secondary, textColors.body),
      primary: colorVariations.primary.base,
      secondary: colorVariations.secondary.base,
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
