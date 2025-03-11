// designPalettes/complementaryPalette.ts
import { DesignPalette, ensureContrast } from "./types";
import tinycolor from "tinycolor2";

export const createComplementaryPalette = (
  primary: string,
  textColors: any,
  shadows: any,
  utility: any,
  contrast: any,
  colorVariations: any,
): DesignPalette => {
  const complementaryColor = tinycolor(primary).complement().toHexString();
  const lightComplementary = tinycolor(primary)
    .complement()
    .lighten(15)
    .toHexString();
  const darkComplementary = tinycolor(primary)
    .complement()
    .darken(15)
    .toHexString();

  return {
    name: "Complementary",
    background: {
      main: complementaryColor,
      light: tinycolor(primary).complement().lighten(10).toHexString(),
      dark: tinycolor(primary).complement().darken(10).toHexString(),
      contrast: ensureContrast(complementaryColor, "#FFFFFF"),
      accent: primary,
      gradient: {
        primary: complementaryColor,
        secondary: lightComplementary,
        css: `linear-gradient(to right, ${complementaryColor}, ${lightComplementary})`,
        primaryToSecondary: `linear-gradient(to right, ${complementaryColor}, ${lightComplementary})`,
        secondaryToPrimary: `linear-gradient(to left, ${complementaryColor}, ${lightComplementary})`,
        radial: `radial-gradient(circle, ${complementaryColor}, ${lightComplementary})`,
      },
    },
    container: {
      primary: tinycolor(primary).complement().lighten(10).toHexString(),
      secondary: tinycolor(primary).complement().lighten(20).toHexString(),
      light: "#FFFFFF",
      dark: tinycolor(primary).complement().darken(15).toHexString(),
      transparent: tinycolor(primary).complement().setAlpha(0.8).toRgbString(),
      accent: primary,
      highlight: tinycolor(primary).lighten(15).toHexString(),
      onBackground: {
        main: tinycolor(complementaryColor).lighten(10).toString(),
        light: tinycolor(complementaryColor).lighten(20).toString(),
        dark: tinycolor(complementaryColor).darken(10).toString(),
      },
    },
    text: {
      onBackground: {
        main: ensureContrast(complementaryColor, "#FFFFFF"),
        light: ensureContrast(lightComplementary, "#FFFFFF"),
        dark: ensureContrast(darkComplementary, "#FFFFFF"),
      },
      onContainer: {
        primary: ensureContrast(
          tinycolor(primary).complement().lighten(10).toHexString(),
          "#FFFFFF",
        ),
        secondary: ensureContrast(
          tinycolor(primary).complement().lighten(20).toHexString(),
          "#FFFFFF",
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(
          tinycolor(primary).complement().darken(15).toHexString(),
          "#FFFFFF",
        ),
      },
      title: ensureContrast(complementaryColor, "#FFFFFF"),
      body: ensureContrast(complementaryColor, "#FFFFFF"),
      muted: tinycolor(ensureContrast(complementaryColor, "#FFFFFF"))
        .setAlpha(0.7)
        .toRgbString(),
      primary: colorVariations?.primary?.base || primary,
      secondary: complementaryColor,
      accent: primary,
      contrast: ensureContrast(complementaryColor, "#FFFFFF"),
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
        `0 0 15px ${tinycolor(primary).complement().setAlpha(0.5).toRgbString()}`,
    },
  };
};
