// designPalettes/complementaryPalette.ts
import {
  DesignPalette,
  ensureContrast,
  GradientOptions,
  TextColors,
  ShadowOptions,
  UtilityColors,
  ContrastOptions,
  ColorVariations,
} from "./types";
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

export const createComplementaryPalette = (
  primary: string,
  textColors: TextColors,
  shadows: ShadowOptions,
  utility: UtilityColors,
  contrast: ContrastOptions,
  colorVariations: ColorVariations,
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
        primary: createGradientOptions(complementaryColor, lightComplementary),
        secondary: createGradientOptions(lightComplementary, darkComplementary),
        primaryToSecondary: createGradientOptions(
          complementaryColor,
          lightComplementary,
        ),
        secondaryToPrimary: createGradientOptions(
          lightComplementary,
          complementaryColor,
          "linear",
          "to left",
        ),
        radial: `radial-gradient(circle, ${complementaryColor}, ${lightComplementary})`,
        conicGradient: createGradientOptions(
          complementaryColor,
          lightComplementary,
        ),
        hardStopGradient: createGradientOptions(
          complementaryColor,
          lightComplementary,
        ),
        meshGradient: createGradientOptions(
          complementaryColor,
          lightComplementary,
        ),
        primaryAdvanced: createGradientOptions(
          complementaryColor,
          lightComplementary,
        ),
        primaryRadial: createGradientOptions(
          complementaryColor,
          lightComplementary,
          "radial",
        ),
        secondaryAdvanced: createGradientOptions(
          lightComplementary,
          darkComplementary,
        ),
        secondaryRadial: createGradientOptions(
          lightComplementary,
          darkComplementary,
          "radial",
        ),
      },
    },
    container: {
      primary: tinycolor(primary).complement().lighten(10).toHexString(),
      secondary: tinycolor(primary).complement().lighten(20).toHexString(),
      main: tinycolor(primary).complement().lighten(10).toHexString(),
      light: "#FFFFFF",
      dark: tinycolor(primary).complement().darken(15).toHexString(),
      transparent: tinycolor(primary).complement().setAlpha(0.8).toRgbString(),
      accent: primary,
      highlight: tinycolor(primary).lighten(15).toHexString(),
      gradientPrimaryToSecondaryHorizontal: `linear-gradient(to right, ${complementaryColor}, ${primary})`,
      gradientPrimaryToSecondaryVertical: `linear-gradient(to bottom, ${complementaryColor}, ${primary})`,
      gradientSecondaryToPrimaryHorizontal: `linear-gradient(to right, ${primary}, ${complementaryColor})`,
      gradientSecondaryToPrimaryVertical: `linear-gradient(to bottom, ${primary}, ${complementaryColor})`,
      saturated: tinycolor(complementaryColor).saturate(20).toString(),
      transparentAccent: tinycolor(primary).setAlpha(0.7).toRgbString(),
      transparentMain: tinycolor(complementaryColor)
        .setAlpha(0.7)
        .toRgbString(),
      transparentPrimary: tinycolor(primary).setAlpha(0.7).toRgbString(),
      transparentSecondary: tinycolor(lightComplementary)
        .setAlpha(0.7)
        .toRgbString(),
      muted: tinycolor(complementaryColor).setAlpha(0.5).toRgbString(),
    },
    text: {
      onBackground: {
        main: ensureContrast(complementaryColor, "#FFFFFF"),
        light: ensureContrast(lightComplementary, "#FFFFFF"),
        dark: ensureContrast(darkComplementary, "#FFFFFF"),
        muted: tinycolor(ensureContrast(complementaryColor, "#FFFFFF"))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
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
        muted: tinycolor(ensureContrast(complementaryColor, "#FFFFFF"))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
      },
      title: ensureContrast(complementaryColor, "#FFFFFF"),
      body: ensureContrast(complementaryColor, "#FFFFFF"),
      primary: colorVariations?.primary?.base || primary,
      secondary: complementaryColor,
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
