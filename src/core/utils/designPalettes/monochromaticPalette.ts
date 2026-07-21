// designPalettes/monochromaticPalette.ts
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

export const createMonochromaticPalette = (
  primary: string,
  colorVariations: ColorVariations,
  textColors: TextColors,
  shadows: ShadowOptions,
  utility: UtilityColors,
  contrast: ContrastOptions,
): DesignPalette => {
  const primaryVariations = colorVariations.primary;
  const accentColor =
    primaryVariations.accent || tinycolor(primary).spin(30).toString();
  const preferredOnPrimary = textColors.onPrimary || "#FFFFFF";

  return {
    name: "Monochromatic",
    background: {
      ...createBackgroundIdentity(primary, accentColor),
      main: primary,
      light: primaryVariations.lighter || primary,
      dark: primaryVariations.darker || primary,
      contrast: primaryVariations.contrastText || "#FFFFFF",
      accent: accentColor,
      gradient: {
        primary: createGradientOptions(
          primaryVariations.darker || primary,
          primaryVariations.lighter || primary,
        ),
        secondary: createGradientOptions(
          primaryVariations.lighter || primary,
          primaryVariations.lighter || primary,
        ),
        primaryToSecondary: createGradientOptions(
          primaryVariations.darker || primary,
          primaryVariations.lighter || primary,
        ),
        secondaryToPrimary: createGradientOptions(
          primaryVariations.lighter || primary,
          primaryVariations.darker || primary,
          "linear",
          "to left",
        ),
        radial: `radial-gradient(circle, ${primaryVariations.darker || primary}, ${primaryVariations.lighter || primary})`,
        conicGradient: createGradientOptions(
          primaryVariations.darker || primary,
          primaryVariations.lighter || primary,
        ),
        hardStopGradient: createGradientOptions(
          primaryVariations.darker || primary,
          primaryVariations.lighter || primary,
        ),
        meshGradient: createGradientOptions(
          primaryVariations.darker || primary,
          primaryVariations.lighter || primary,
        ),
        primaryAdvanced: createGradientOptions(
          primaryVariations.darker || primary,
          primaryVariations.lighter || primary,
        ),
        primaryRadial: createGradientOptions(
          primaryVariations.darker || primary,
          primaryVariations.lighter || primary,
          "radial",
        ),
        secondaryAdvanced: createGradientOptions(
          primaryVariations.lighter || primary,
          primaryVariations.light || primary,
        ),
        secondaryRadial: createGradientOptions(
          primaryVariations.lighter || primary,
          primaryVariations.light || primary,
          "radial",
        ),
      },
    },
    container: {
      primary: primaryVariations.light || primary,
      secondary:
        primaryVariations.lighter || primaryVariations.light || primary,
      main: primaryVariations.light || primary,
      light: primaryVariations.lighter || primaryVariations.light || primary,
      dark: primaryVariations.dark || primary,
      transparent: tinycolor(primary).setAlpha(0.8).toRgbString(),
      accent: accentColor,
      highlight:
        primaryVariations.lighter || primaryVariations.light || primary,
      gradientPrimaryToSecondaryHorizontal: `linear-gradient(to right, ${primary}, ${accentColor})`,
      gradientPrimaryToSecondaryVertical: `linear-gradient(to bottom, ${primary}, ${accentColor})`,
      gradientSecondaryToPrimaryHorizontal: `linear-gradient(to right, ${accentColor}, ${primary})`,
      gradientSecondaryToPrimaryVertical: `linear-gradient(to bottom, ${accentColor}, ${primary})`,
      saturated: tinycolor(primary).saturate(20).toString(),
      transparentAccent: tinycolor(accentColor).setAlpha(0.7).toRgbString(),
      transparentMain: tinycolor(primary).setAlpha(0.7).toRgbString(),
      transparentPrimary: tinycolor(primary).toRgbString(),
      transparentSecondary: tinycolor(
        primaryVariations.lighter || primaryVariations.light || primary,
      )
        .setAlpha(0.7)
        .toRgbString(),
      muted: tinycolor(primary).setAlpha(0.5).toRgbString(),
      ...createContainerSurfaceFields(primary),
    },
    text: {
      onBackground: {
        main: ensureContrast(primary, preferredOnPrimary),
        light: ensureContrast(
          primaryVariations.lighter || primary,
          preferredOnPrimary,
        ),
        dark: ensureContrast(
          primaryVariations.darker || primary,
          preferredOnPrimary,
        ),
        muted: tinycolor(ensureContrast(primary, preferredOnPrimary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: accentColor,
      },
      onContainer: {
        primary: ensureContrast(
          primaryVariations.light || primary,
          preferredOnPrimary,
        ),
        secondary: ensureContrast(
          primaryVariations.lighter || primaryVariations.light || primary,
          textColors.onSecondary || "#FFFFFF",
        ),
        light: ensureContrast(
          primaryVariations.lighter || primaryVariations.light || primary,
          preferredOnPrimary,
        ),
        dark: ensureContrast(
          primaryVariations.dark || primary,
          preferredOnPrimary,
        ),
        muted: tinycolor(ensureContrast(primary, preferredOnPrimary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: accentColor,
        ...createOnContainerContentText(primary, preferredOnPrimary),
      },
      title: ensureContrast(primary, preferredOnPrimary),
      body: ensureContrast(primary, preferredOnPrimary),
      primary: primaryVariations.base || primary,
      secondary: primaryVariations.light || primary,
      accent: accentColor,
      contrast: preferredOnPrimary,
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
