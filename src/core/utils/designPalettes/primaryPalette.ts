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
      main: tinycolor(primary).lighten(10).toString(),
      light: tinycolor(primary).lighten(20).toString(),
      dark: tinycolor(primary).lighten(5).toString(),
      primary: primaryVariations.light,
      secondary: primaryVariations.lighter,
      accent: secondary,
      highlight: primaryVariations.lighter,

      transparent: tinycolor(primary).setAlpha(0.8).toRgbString(),
    },
    text: {
      onBackground: {
        main: ensureContrast(primary, textColors.onPrimary),
        light: ensureContrast(primaryVariations.light, textColors.onPrimary),
        dark: ensureContrast(primaryVariations.dark, textColors.onPrimary),
        muted: tinycolor(ensureContrast(primary, textColors.onPrimary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: secondary,
      },
      onContainer: {
        primary: ensureContrast(primaryVariations.light, textColors.onPrimary),
        secondary: ensureContrast(
          primaryVariations.lighter,
          textColors.onPrimary,
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(primaryVariations.darker, textColors.onPrimary),
        muted: tinycolor(ensureContrast(primary, textColors.onPrimary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: secondary,
      },
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
