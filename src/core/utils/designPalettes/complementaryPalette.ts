// designPalettes/complementaryPalette.ts
import {
  DesignPalette,
  ensureContrast,
  TextColors,
  ShadowOptions,
  UtilityColors,
  ContrastOptions,
  ColorVariations,
} from "./types";
import tinycolor from "tinycolor2";
import {
  createBackgroundIdentity,
  createContainerSurfaceFields,
  createGradientOptions,
  createOnContainerContentText,
} from "./paletteHelpers";

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
  const preferredText = "#FFFFFF";

  return {
    name: "Complementary",
    background: {
      ...createBackgroundIdentity(primary, complementaryColor),
      main: complementaryColor,
      light: tinycolor(primary).complement().lighten(10).toHexString(),
      dark: tinycolor(primary).complement().darken(10).toHexString(),
      contrast: ensureContrast(complementaryColor, preferredText),
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
      ...createContainerSurfaceFields(complementaryColor),
    },
    text: {
      onBackground: {
        main: ensureContrast(complementaryColor, preferredText),
        light: ensureContrast(lightComplementary, preferredText),
        dark: ensureContrast(darkComplementary, preferredText),
        muted: tinycolor(ensureContrast(complementaryColor, preferredText))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
      },
      onContainer: {
        primary: ensureContrast(
          tinycolor(primary).complement().lighten(10).toHexString(),
          preferredText,
        ),
        secondary: ensureContrast(
          tinycolor(primary).complement().lighten(20).toHexString(),
          preferredText,
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(
          tinycolor(primary).complement().darken(15).toHexString(),
          preferredText,
        ),
        muted: tinycolor(ensureContrast(complementaryColor, preferredText))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
        ...createOnContainerContentText(complementaryColor, preferredText),
      },
      title: ensureContrast(complementaryColor, preferredText),
      body: ensureContrast(complementaryColor, preferredText),
      primary: colorVariations?.primary?.base || primary,
      secondary: complementaryColor,
      contrast: ensureContrast(complementaryColor, preferredText),
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
