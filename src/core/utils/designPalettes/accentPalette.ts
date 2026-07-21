// designPalettes/accentPalette.ts
import {
  ColorVariations,
  ContrastOptions,
  DesignPalette,
  ensureContrast,
  ShadowOptions,
  TextColors,
  UtilityColors,
} from "./types";
import tinycolor from "tinycolor2";
import {
  createBackgroundIdentity,
  createContainerSurfaceFields,
  createGradientOptions,
  createOnContainerContentText,
} from "./paletteHelpers";

export const createAccentPalette = (
  primary: string,
  secondary: string,
  colorVariations: ColorVariations,
  textColors: TextColors,
  shadows: ShadowOptions,
  utility: UtilityColors,
  contrast: ContrastOptions,
): DesignPalette => {
  const secondaryVariations = colorVariations.secondary;
  const mainBg =
    secondaryVariations.dark || secondaryVariations.base || "#000000";
  const preferredOnSecondary = textColors.onSecondary || "#FFFFFF";

  return {
    name: "Accent",
    background: {
      ...createBackgroundIdentity(primary, secondary),
      main: mainBg,
      light: secondaryVariations.base || "#FFFFFF",
      dark:
        secondaryVariations.darker ||
        secondaryVariations.dark ||
        secondaryVariations.base ||
        "#000000",
      contrast: secondaryVariations.contrastText || "#FFFFFF",
      accent: colorVariations.primary.base || primary,
      gradient: {
        primary: createGradientOptions(
          secondaryVariations.dark || secondaryVariations.base || "#000000",
          secondaryVariations.base || "#FFFFFF",
        ),
        secondary: createGradientOptions(
          secondaryVariations.base || "#FFFFFF",
          secondaryVariations.light || secondaryVariations.base || "#FFFFFF",
        ),
        primaryToSecondary: createGradientOptions(
          secondaryVariations.dark || secondaryVariations.base || "#000000",
          secondaryVariations.base || "#FFFFFF",
        ),
        secondaryToPrimary: createGradientOptions(
          secondaryVariations.base || "#FFFFFF",
          secondaryVariations.dark || secondaryVariations.base || "#000000",
          "linear",
          "to left",
        ),
        radial: `radial-gradient(circle, ${secondaryVariations.dark || secondaryVariations.base || "#000000"}, ${secondaryVariations.base || "#FFFFFF"})`,
        conicGradient: createGradientOptions(
          secondaryVariations.dark || secondaryVariations.base || "#000000",
          secondaryVariations.base || "#FFFFFF",
        ),
        hardStopGradient: createGradientOptions(
          secondaryVariations.dark || secondaryVariations.base || "#000000",
          secondaryVariations.base || "#FFFFFF",
        ),
        meshGradient: createGradientOptions(
          secondaryVariations.dark || secondaryVariations.base || "#000000",
          secondaryVariations.base || "#FFFFFF",
        ),
        primaryAdvanced: createGradientOptions(
          secondaryVariations.dark || secondaryVariations.base || "#000000",
          secondaryVariations.base || "#FFFFFF",
        ),
        primaryRadial: createGradientOptions(
          secondaryVariations.dark || secondaryVariations.base || "#000000",
          secondaryVariations.base || "#FFFFFF",
          "radial",
        ),
        secondaryAdvanced: createGradientOptions(
          secondaryVariations.base || "#FFFFFF",
          secondaryVariations.light || secondaryVariations.base || "#FFFFFF",
        ),
        secondaryRadial: createGradientOptions(
          secondaryVariations.base || "#FFFFFF",
          secondaryVariations.light || secondaryVariations.base || "#FFFFFF",
          "radial",
        ),
      },
    },
    container: {
      primary: secondaryVariations.base || "#FFFFFF",
      secondary:
        secondaryVariations.light || secondaryVariations.base || "#FFFFFF",
      main: secondaryVariations.base || "#FFFFFF",
      light: "#FFFFFF",
      dark:
        secondaryVariations.darker ||
        secondaryVariations.dark ||
        secondaryVariations.base ||
        "#000000",
      accent: secondaryVariations.accent || secondaryVariations.base || primary,
      highlight:
        secondaryVariations.lighter ||
        secondaryVariations.light ||
        secondaryVariations.base ||
        "#FFFFFF",
      transparent: tinycolor(
        secondaryVariations.dark || secondaryVariations.base || "#000000",
      )
        .setAlpha(0.8)
        .toRgbString(),
      gradientPrimaryToSecondaryHorizontal: `linear-gradient(to right, ${secondaryVariations.base || "#FFFFFF"}, ${secondaryVariations.light || secondaryVariations.base || "#FFFFFF"})`,
      gradientPrimaryToSecondaryVertical: `linear-gradient(to bottom, ${secondaryVariations.base || "#FFFFFF"}, ${secondaryVariations.light || secondaryVariations.base || "#FFFFFF"})`,
      gradientSecondaryToPrimaryHorizontal: `linear-gradient(to right, ${secondaryVariations.light || secondaryVariations.base || "#FFFFFF"}, ${secondaryVariations.base || "#FFFFFF"})`,
      gradientSecondaryToPrimaryVertical: `linear-gradient(to bottom, ${secondaryVariations.light || secondaryVariations.base || "#FFFFFF"}, ${secondaryVariations.base || "#FFFFFF"})`,
      saturated: tinycolor(secondaryVariations.base || "#FFFFFF")
        .saturate(20)
        .toString(),
      transparentAccent: tinycolor(
        secondaryVariations.accent || secondaryVariations.base || primary,
      )
        .setAlpha(0.7)
        .toRgbString(),
      transparentMain: tinycolor(secondaryVariations.base || "#FFFFFF")
        .setAlpha(0.7)
        .toRgbString(),
      transparentPrimary: tinycolor(primary).setAlpha(0.7).toRgbString(),
      transparentSecondary: tinycolor(
        secondaryVariations.light || secondaryVariations.base || "#FFFFFF",
      )
        .setAlpha(0.7)
        .toRgbString(),
      muted: tinycolor(secondaryVariations.base || "#FFFFFF")
        .setAlpha(0.5)
        .toRgbString(),
      ...createContainerSurfaceFields(
        secondaryVariations.base || secondary || "#FFFFFF",
      ),
    },
    text: {
      onBackground: {
        main: ensureContrast(mainBg, preferredOnSecondary),
        light: ensureContrast(
          secondaryVariations.base || "#FFFFFF",
          preferredOnSecondary,
        ),
        dark: ensureContrast(
          secondaryVariations.darker ||
            secondaryVariations.dark ||
            secondaryVariations.base ||
            "#000000",
          preferredOnSecondary,
        ),
        muted: tinycolor(ensureContrast(mainBg, preferredOnSecondary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: colorVariations.primary.base || primary,
      },
      onContainer: {
        primary: ensureContrast(
          secondaryVariations.base || "#FFFFFF",
          preferredOnSecondary,
        ),
        secondary: ensureContrast(
          secondaryVariations.light || secondaryVariations.base || "#FFFFFF",
          preferredOnSecondary,
        ),
        light: ensureContrast("#FFFFFF", "#111827"),
        dark: ensureContrast(
          secondaryVariations.darker ||
            secondaryVariations.dark ||
            secondaryVariations.base ||
            "#000000",
          preferredOnSecondary,
        ),
        muted: tinycolor(ensureContrast(mainBg, preferredOnSecondary))
          .setAlpha(0.7)
          .toRgbString(),
        accent: colorVariations.primary.base || primary,
        ...createOnContainerContentText(mainBg, preferredOnSecondary),
      },
      title: ensureContrast(mainBg, preferredOnSecondary),
      body: ensureContrast(mainBg, preferredOnSecondary),
      primary: colorVariations.primary.base || primary,
      secondary: colorVariations.secondary.base || secondary,
      accent:
        colorVariations.primary.accent ||
        colorVariations.primary.base ||
        primary,
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
        `0 0 15px ${tinycolor(mainBg).setAlpha(0.5).toRgbString()}`,
    },
  };
};
