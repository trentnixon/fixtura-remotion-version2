// designPalettes/accentPalette.ts
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
        primary: createGradientOptions(
          secondaryVariations.dark,
          secondaryVariations.base,
        ),
        secondary: createGradientOptions(
          secondaryVariations.base,
          secondaryVariations.light,
        ),
        primaryToSecondary: createGradientOptions(
          secondaryVariations.dark,
          secondaryVariations.base,
        ),
        secondaryToPrimary: createGradientOptions(
          secondaryVariations.base,
          secondaryVariations.dark,
          "linear",
          "to left",
        ),
        radial: `radial-gradient(circle, ${secondaryVariations.dark}, ${secondaryVariations.base})`,
        conicGradient: createGradientOptions(
          secondaryVariations.dark,
          secondaryVariations.base,
        ),
        hardStopGradient: createGradientOptions(
          secondaryVariations.dark,
          secondaryVariations.base,
        ),
        meshGradient: createGradientOptions(
          secondaryVariations.dark,
          secondaryVariations.base,
        ),
        primaryAdvanced: createGradientOptions(
          secondaryVariations.dark,
          secondaryVariations.base,
        ),
        primaryRadial: createGradientOptions(
          secondaryVariations.dark,
          secondaryVariations.base,
          "radial",
        ),
        secondaryAdvanced: createGradientOptions(
          secondaryVariations.base,
          secondaryVariations.light,
        ),
        secondaryRadial: createGradientOptions(
          secondaryVariations.base,
          secondaryVariations.light,
          "radial",
        ),
      },
    },
    container: {
      primary: secondaryVariations.base,
      secondary: secondaryVariations.light,
      main: secondaryVariations.base,
      light: "#FFFFFF",
      dark: secondaryVariations.darker,
      accent: secondaryVariations.accent,
      highlight: secondaryVariations.lighter,
      transparent: tinycolor(secondaryVariations.dark)
        .setAlpha(0.8)
        .toRgbString(),
    },
    text: {
      onBackground: {
        main: ensureContrast(secondaryVariations.dark, textColors.onSecondary),
        light: ensureContrast(secondaryVariations.base, textColors.onSecondary),
        dark: ensureContrast(
          secondaryVariations.darker,
          textColors.onSecondary,
        ),
        muted: tinycolor(
          ensureContrast(secondaryVariations.dark, textColors.onSecondary),
        )
          .setAlpha(0.7)
          .toRgbString(),
        accent: colorVariations.primary.base,
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
        muted: tinycolor(
          ensureContrast(secondaryVariations.dark, textColors.onSecondary),
        )
          .setAlpha(0.7)
          .toRgbString(),
        accent: colorVariations.primary.base,
      },
      title: ensureContrast(secondaryVariations.dark, textColors.onSecondary),
      body: ensureContrast(secondaryVariations.dark, textColors.onSecondary),
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
