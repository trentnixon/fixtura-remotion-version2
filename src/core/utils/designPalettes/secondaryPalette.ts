// designPalettes/secondaryPalette.ts
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

export const createSecondaryPalette = (
  primary: string,
  secondary: string,
  colorVariations: ColorVariations,
  textColors: TextColors,
  shadows: ShadowOptions,
  gradients: unknown,
  utility: UtilityColors,
  contrast: ContrastOptions,
): DesignPalette => {
  const secondaryVariations = colorVariations.secondary;
  const preferredOnSecondary = textColors.onSecondary || "#FFFFFF";

  return {
    name: "Secondary",
    background: {
      ...createBackgroundIdentity(primary, secondary),
      main: secondary,
      light: secondaryVariations.light || secondary,
      dark: secondaryVariations.dark || secondary,
      contrast: secondaryVariations.contrastText || "#FFFFFF",
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
      primary: secondaryVariations.light || secondary,
      secondary:
        secondaryVariations.lighter || secondaryVariations.light || secondary,
      main: secondaryVariations.light || secondary,
      light: "#FFFFFF",
      dark: secondaryVariations.darker || secondaryVariations.dark || secondary,
      transparent: tinycolor(secondary).setAlpha(0.8).toRgbString(),
      accent: primary,
      highlight:
        secondaryVariations.lighter || secondaryVariations.light || secondary,
      gradientPrimaryToSecondaryHorizontal: `linear-gradient(to right, ${secondary}, ${primary})`,
      gradientPrimaryToSecondaryVertical: `linear-gradient(to bottom, ${secondary}, ${primary})`,
      gradientSecondaryToPrimaryHorizontal: `linear-gradient(to right, ${primary}, ${secondary})`,
      gradientSecondaryToPrimaryVertical: `linear-gradient(to bottom, ${primary}, ${secondary})`,
      saturated: tinycolor(secondary).saturate(20).toString(),
      transparentAccent: tinycolor(primary).setAlpha(0.7).toRgbString(),
      transparentMain: tinycolor(secondary).setAlpha(0.7).toRgbString(),
      transparentPrimary: tinycolor(secondaryVariations.light).toRgbString(),
      transparentSecondary: tinycolor(
        secondaryVariations.lighter || secondaryVariations.light || secondary,
      )
        .setAlpha(0.7)
        .toRgbString(),
      muted: tinycolor(secondary).setAlpha(0.5).toRgbString(),
      ...createContainerSurfaceFields(secondary),
    },
    text: {
      onBackground: {
        main: ensureContrast(secondary, preferredOnSecondary),
        light: ensureContrast(
          secondaryVariations.light || secondary,
          preferredOnSecondary,
        ),
        dark: ensureContrast(
          secondaryVariations.dark || secondary,
          preferredOnSecondary,
        ),
        muted: tinycolor(ensureContrast(secondary, preferredOnSecondary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
      },
      onContainer: {
        primary: ensureContrast(
          secondaryVariations.light || secondary,
          preferredOnSecondary,
        ),
        secondary: ensureContrast(
          secondaryVariations.lighter || secondaryVariations.light || secondary,
          textColors.onPrimary || "#FFFFFF",
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(
          secondaryVariations.darker || secondaryVariations.dark || secondary,
          preferredOnSecondary,
        ),
        muted: tinycolor(ensureContrast(secondary, preferredOnSecondary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: primary,
        ...createOnContainerContentText(secondary, preferredOnSecondary),
      },
      title: ensureContrast(secondary, textColors.title || "#FFFFFF"),
      body: ensureContrast(secondary, textColors.body || "#FFFFFF"),
      primary: colorVariations.primary.base || primary,
      secondary: colorVariations.secondary.base || secondary,
      contrast: preferredOnSecondary,
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
